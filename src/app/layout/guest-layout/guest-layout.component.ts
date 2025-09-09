import {
  Component,
  effect,
  inject,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../core/material.module';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonService } from '../../core/services/common.service';
import { MatDrawer } from '@angular/material/sidenav';
import { storageKey } from '../../core/constants/storage-key';
import { ComponentModule } from '../../shared/component.module';
import { DialogConfirmActionComponent } from '../../shared/components/dialog-confirm-action/dialog-confirm-action.component';
// import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import { environment } from '../../../environments/environment';
import { WebsocketService } from '../../core/services/Websocket.service';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationType } from '../../core/constants/enum';
import _, { forEach } from 'lodash';
import { ApiService } from '../../core/services/api.service';
import {
  GUEST_NOTIFICATION_DETAIL,
  GUEST_NOTIFICATION_GET_LIST,
  GUEST_NOTIFICATION_UNREAD_COUNT,
  GUEST_NOTIFICATION_UPDATE,
  GUEST_NOTIFICATION_UPDATE_ALL,
} from '../../core/constants/gqlqueries/guest-approval-query';
import {
  compareAsc,
  differenceInCalendarDays,
  format,
  startOfDay,
} from 'date-fns';
import { GQL_QUERIES } from '../../core/constants/service-gql';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    RouterOutlet,
    ComponentModule,
    DialogConfirmActionComponent,
  ],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss',
  providers: [],
})
export class GuestLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('slideNav') slideNav!: MatDrawer;
  @ViewChild('notificationDetailTemplate')
  notificationDetailTemplate!: TemplateRef<any>;
  routes = routes;
  destroyed = new Subject<void>();
  currentScreenSize = '';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  isSmallScreen = false;
  slideNavConfig: any;

  /** Notification */
  @ViewChild('notificationTemplate') notificationTemplate!: TemplateRef<any>;
  unreadCount = signal<number>(0);
  tabBrowserVisible = signal(true);
  tabs = [
    {
      value: NotificationViewType.all,
      name: 'COMMON.LABEL.NOTI_ALL',
    },
    {
      value: NotificationViewType.read,
      name: 'COMMON.LABEL.NOTI_READ',
    },
    {
      value: NotificationViewType.unRead,
      name: 'COMMON.LABEL.NOTI_UNREAD',
    },
  ];
  currentTabIndex = 0;
  notifications = signal<any>(null);
  isLoadingNotification = signal(false);
  notificationDetail: any = null;
  page = 1;
  notificationDataSource: any = {
    all: [],
    read: [],
    unRead: [],
  };
  notificationFilter: any = {
    all: {},
    read: {},
    unRead: {},
  };
  visibleNotification = false;
  notificationDetailSetting: any = {
    header: '',
    btnOK: '',
    btnCancel: 'COMMON.BUTTON.CLOSE',
  };
  messageNotification = signal<any>(null);

  /** Logged user */
  user: any = null;

  authService = inject(AuthService);
  commonService = inject(CommonService);
  // afMessaging = inject(AngularFireMessaging)
  // guestService = inject(GuestService);
  logoUrl = 'assets/images/guest/logo.svg';
  constructor(
    private zone: NgZone,
    private router: Router,
    private websocketService: WebsocketService,
    private notificationService: NotificationService,
    private injector: Injector,
    public sanitizer: DomSanitizer
  ) {
    if (environment.staging) {
      this.logoUrl = 'assets/images/logo_oxii_work.svg';
    }
    if (environment.uat) {
      this.logoUrl = 'assets/images/guest/logo-uat.svg';
    }
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? '';
            this.isSmallScreen = ['Small', 'XSmall'].includes(
              this.currentScreenSize
            );
            this.commonService.smallScreen.set(this.isSmallScreen);
          }
        }
      });
    effect(
      () => {
        if (this.commonService.openSlideNav()) {
          this.slideNav.open();
        } else {
          this.slideNav.close();
        }
        this.slideNavConfig = this.commonService.slideNavConfig();
        this.messageNotification.set(this.commonService.messageNotification());
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  async ngOnInit() {
    document.addEventListener('visibilitychange', () => {
      this.tabBrowserVisible.update(
        () => document.visibilityState === 'visible'
      );
      if (document.visibilityState === 'visible') {
        document.getElementById('favicon')?.setAttribute('href', 'favicon.png');
      }
    });
    this.user = JSON.parse(localStorage.getItem(storageKey.user) || '')?.user;
    this.websocketService.connect();
    this.websocketService.on('message:sent', async data => {
      if (!this.router.url.includes('/guest/chat')) {
        this.commonService.messageNotification.set({
          unreadCount: (this.messageNotification()?.unreadCount || 0) + 1,
          conversationSelectedId: null,
        });
        this.notificationService.showNotification(
          '💬 ' + data.message?.sender?.fullname,
          data.message?.message,
          data.conversationId
        );
      }
    });
    await this.onGetNotificationUnreadCount();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.websocketService.disconnect();
  }

  handleLogout() {
    this.authService.logout();
  }

  onCloseSlideNav() {
    this.commonService.openSlideNav.set(false);
    this.slideNav.close();
  }

  async onOpenNotification() {
    this.slideNavConfig = {
      position: 'end',
      disableClose: true,
      template: this.notificationTemplate,
    };
    await this.onGetNotificationUnreadCount();
    if (!this.notifications()?.length) {
      this.notifications.set(
        await this.onGetNotifications({
          page: 1,
        })
      );
    }
    this.slideNav.open();
  }

  async onGetNotificationUnreadCount() {
    const response = await this.injector
      .get(ApiService)
      .executeQuery(GUEST_NOTIFICATION_UNREAD_COUNT);
    this.unreadCount.set(
      response?.identityProfile?.unreadNotificationCount || 0
    );
    this.unreadCount.set(response?.identityProfile?.unreadNotificationCount || 0);
  }

  async onGetNotifications(filter: any) {
    const response = await this.injector
      .get(ApiService)
      .executeQuery(GUEST_NOTIFICATION_GET_LIST, {
        filter,
      });
    const _notificationsOrder = _.orderBy(
      response?.notificationGetList?.notifications,
      ['createdAt'],
      ['desc']
    );
    const _preGroup =
      _notificationsOrder?.reduce((arr: any, item: any) => {
        arr.push({
          ...item,
          createdDate: startOfDay(item.createdAt).getTime(),
        });
        return arr;
      }, []) || [];
    const _notificationsGroupByDate = _.groupBy(_preGroup, 'createdDate');
    const _notifications =
      Object.keys(_notificationsGroupByDate)?.reduce((arr: any, key: any) => {
        const isToday = !compareAsc(
          startOfDay(new Date(Number(key))),
          startOfDay(new Date())
        );
        const isYesterday =
          differenceInCalendarDays(
            new Date(Number(key)),
            startOfDay(new Date())
          ) === -1;
        arr.push({
          label: isToday
            ? 'Hôm nay'
            : isYesterday
              ? 'Hôm qua'
              : format(new Date(Number(key)), 'dd/MM/yyyy'),
          data: _notificationsGroupByDate[key],
        });
        return arr;
      }, []) || [];
    switch (this.currentTabIndex) {
      case 0:
        this.notificationFilter = {
          ...this.notificationFilter,
          all: filter,
        };
        break;
      case 1:
        this.notificationFilter = {
          ...this.notificationFilter,
          read: filter,
        };
        break;
      case 2:
        this.notificationFilter = {
          ...this.notificationFilter,
          unRead: filter,
        };
        break;
    }
    return _notifications;
  }

  async onMarkAllNotificationRead() {
    await this.injector
      .get(ApiService)
      .executeMutation(GUEST_NOTIFICATION_UPDATE_ALL, {
        arguments: {
          isRead: true,
        },
      });
    this.unreadCount.set(0);
    const _notifications =
      this.notifications()?.map((item: any) => {
        item.data.map((noti: any) => {
          noti.isRead = true;
        });
        return item;
      }) || [];
    this.notifications.set(_notifications);
  }

  async onTabChange(event: any) {
    let notifications = [];
    switch (event.index) {
      case 0:
        this.currentTabIndex = 0;
        notifications = await this.onGetNotifications({ page: 1 });
        break;
      case 1:
        this.currentTabIndex = 1;
        notifications = await this.onGetNotifications({
          page: 1,
          isRead: true,
        });
        break;
      case 2:
        this.currentTabIndex = 2;
        notifications = await this.onGetNotifications({
          page: 1,
          isRead: false,
        });
        break;
    }
    this.notifications.set(notifications);
  }

  async onOpenNotificationDetail(noti: any) {
    this.visibleNotification = false;
    const [detailResponse, updateReadResponse] = await Promise.all([
      this.injector
        .get(ApiService)
        .executeMutation(GUEST_NOTIFICATION_DETAIL, {
          id: noti.id,
        }),
      this.injector
        .get(ApiService)
        .executeMutation(GUEST_NOTIFICATION_UPDATE, {
          arguments: {
            noticationId: noti.id,
            isRead: true,
          },
        }),
    ]);
    this.notificationDetail = detailResponse?.appNotificationGetDetail;
    this.notificationDetailSetting = {
      ...this.notificationDetailSetting,
      header: this.notificationDetail?.title,
      template: this.notificationDetailTemplate,
    };
    switch (this.currentTabIndex) {
      case 0:
      case 2:
        const notifications = _.cloneDeep(this.notifications());
        for (let i = 0; i < notifications.length; i++) {
          const item = notifications[i];
          for (let j = 0; j < item.data.length; j++) {
            const noti = item.data[j];
            if (noti.id === this.notificationDetail.id) {
              noti.isRead = true;
              break;
            }
          }
        }
        this.notifications.update(() => notifications);
        break;
    }
    this.unreadCount.update((prev) => prev > 0 ? prev - 1 : 0);
    this.visibleNotification = true;
  }
}

export enum NotificationViewType {
  all = 'all',
  read = 'read',
  unRead = 'unRead',
}

export const routes = [
  {
    title: 'MENU_GUEST.MESSENGER',
    icon: '/assets/images/guest/ic_menu_chat.svg',
    visible: true,
    visibleMobile: true,
    key: 'chat',
    path: '/guest/chat',
    children: [],
  },
];
