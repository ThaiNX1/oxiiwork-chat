import { Component, effect, inject, NgZone, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from "../../core/material.module";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AuthService } from "../../auth/auth.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonService } from "../../core/services/common.service";
import { MatDrawer } from "@angular/material/sidenav";
import { storageKey } from "../../core/constants/storage-key";
import { ComponentModule } from "../../shared/component.module";
import {
  DialogConfirmActionComponent
} from "../../shared/components/dialog-confirm-action/dialog-confirm-action.component";
// import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import { GuestService } from "../../pages/guest/guest.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports:
    [
      MaterialModule,
      RouterLink,
      RouterLinkActive,
      TranslateModule,
      RouterOutlet,
      ComponentModule, DialogConfirmActionComponent
    ],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss',
  providers: []
})
export class GuestLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('slideNav') slideNav!: MatDrawer;
  routes = routes
  destroyed = new Subject<void>();
  currentScreenSize = '';
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  isSmallScreen = false
  slideNavConfig: any

  /** Notification */
  @ViewChild('notificationTemplate') notificationTemplate!: TemplateRef<any>;
  unreadCount = signal<number>(0)
  tabBrowserVisible = signal(true)
  tabs = [
    {
      value: NotificationViewType.all,
      name: 'COMMON.LABEL.ALL'
    },
    {
      value: NotificationViewType.read,
      name: 'COMMON.LABEL.NOTI_READ'
    },
    {
      value: NotificationViewType.unRead,
      name: 'COMMON.LABEL.NOTI_UNREAD'
    },
  ]
  currentTab = signal<any>(null)
  notifications = signal<any>(null)
  isLoadingNotification = signal(false)
  notificationDetail: any = null
  page = 1
  notificationDataSource: any = {
    all: [],
    read: [],
    unRead: []
  }
  notificationFilter: any = {
    all: {},
    read: {},
    unRead: {}
  }
  visibleNotification = false
  notificationDetailSetting = {
    header: '',
    btnOK: '',
    btnCancel: 'COMMON.BUTTON.CLOSE',
  }

  /** Logged user */
  user: any = null

  authService = inject(AuthService);
  commonService = inject(CommonService);
  // afMessaging = inject(AngularFireMessaging)
  guestService = inject(GuestService);
  logoUrl = 'assets/images/guest/logo.svg';
  constructor(
    private zone: NgZone,
    private router: Router,
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
            this.isSmallScreen = ['Small', 'XSmall'].includes(this.currentScreenSize)
            this.commonService.smallScreen.set(this.isSmallScreen)
          }
        }
      });
    effect(() => {
      if (this.commonService.openSlideNav()) {
        this.slideNav.open()
      } else {
        this.slideNav.close()
      }
      this.slideNavConfig = this.commonService.slideNavConfig()
    })
  }

  async ngOnInit() {
    document.addEventListener('visibilitychange', () => {
      this.tabBrowserVisible.update(() => document.visibilityState === 'visible')
      if (document.visibilityState === 'visible') {
        document.getElementById('favicon')?.setAttribute('href', 'favicon.png')
      }
    })
    this.user = JSON.parse(localStorage.getItem(storageKey.user) || '')?.user
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  handleLogout() {
    this.authService.logout()
  }

  onCloseSlideNav() {
    this.commonService.openSlideNav.set(false)
    this.slideNav.close()
  }
}

export enum NotificationViewType {
  all = 'all',
  read = 'read',
  unRead = 'unRead'
}

export const routes = [
  {
    title: 'MENU_GUEST.MESSENGER',
    icon: '/assets/images/guest/ic_menu_chat.svg',
    visible: true,
    visibleMobile: true,
    key: 'chat',
    path: '/guest/chat',
    children: []
  }
]
