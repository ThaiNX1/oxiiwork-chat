import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  SecurityContext,
  signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDrawer } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VirtualScroll } from '@lithiumjs/ngx-virtual-scroll';
import {
  addDays,
  addMonths,
  compareAsc,
  endOfDay,
  format,
  getDate,
  startOfDay,
} from 'date-fns';
import * as _ from 'lodash';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import * as uuid from 'uuid';
import { BaseGuestClass } from '../../../commons/base-guest.class';
import {
  ChatConversationGroupType,
  ChatConversationType,
  ChatMessageAct,
  ChatMessageReactionAct,
  ChatMessageType,
  ConversationActionType,
  OfficeChatMessage,
} from '../../../commons/types';
import { constant } from '../../../core/constants/constant';
import { NotificationService } from '../../../core/services/notification.service';
import { TitleNotificationService } from '../../../core/services/title-notification.service';
import { UploadFileService } from '../../../core/services/upload-file.service';
import { WebsocketService } from '../../../core/services/Websocket.service';
import {
  endCodeUriFileDownLoad,
  extractMentionSpans,
  getCaretSpanInfo,
  insertSpaceEscapingElementAtCaret,
  logCaretPosition,
  removeEmptySpan,
  removeVietnameseTones,
  replaceMentionSpansWithTokens,
  string2date,
  unwrapFontTags,
  urlModify,
  urlVerify
} from '../../../core/utils/utils';
import { GuestService } from '../guest.service';
import { Store } from '@ngxs/store';
import { ConversationState, Reset } from './state/conversation.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { MentionUser } from './mention/mention.types';

@Component({
  selector: 'app-guest-chat',
  templateUrl: './guest-chat.component.html',
  styleUrl: './guest-chat.component.scss',
  providers: [HttpClient],
})
export class GuestChatComponent
  extends BaseGuestClass
  implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  MessageViewType = { ...MessageViewType, ...ChatMessageType };
  MessageRole = MessageRole;
  ChatMessageType = ChatMessageType;
  ChatConversationType = ChatConversationType;
  ConversationActionType = ConversationActionType;
  ChatMessageAct = {
    ...ChatMessageAct,
    COPY: 'COPY',
  };
  MessageMemberAction = MessageMemberAction;
  conversationFilterForm!: FormGroup;
  conversationSelectedFilterForm!: FormGroup;
  sendMessageForm!: FormGroup;
  mentionRegex =
    /\[@(all|[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12})\](?=\s|$)/g;
  urlRegex = /((http|https)?:\/\/[^\s]+)/g;
  conversationSelected = signal<any>(null);
  conversations = signal<any>([]);
  conversationFilter: any = {
    page: 0,
    size: 100,
    keyword: '',
  };
  conversationMessageIndex = signal(0);
  conversationMessageFilter: any = {
    conversationId: '',
    lastKey: null,
    size: 100,
  };
  emojis = signal<any>([]);
  messageHover = signal<any>(null);
  scrollToEnd = signal(false);

  /** Search in conversation selected */
  searchByDate = signal(false);
  messageSearchSelected = signal<any>(null);

  /** Create conversation */
  searchUserList = signal<any>([]);
  newGroupConversationForm!: FormGroup;
  groupConversationMemberArray!: FormArray;

  /** Textbox message */
  @ViewChild('viewportMessage') viewportMessage!: VirtualScroll<any>;
  @ViewChild('messageActionTemplate') messageActionTemplate!: TemplateRef<any>;
  myCanvasContext: any;
  widthCompare: number = 0;
  messageActionOverlayRef!: OverlayRef;
  messageSendEmojiOverlayRef!: OverlayRef;
  messageActionOverlayRefOutsidePointerEvents!: any;
  messageSendEmojiOverlayRefOutsidePointerEvents!: any;
  messageFiles: any = [];
  senderTyping = signal<any>(null);
  updateReadMessageIndexBehavior = new Subject<number>();
  coordinateFormInputMessage = signal<any>(null);
  geolocationCurrentPosition = signal<any>(null);
  overlayTemplates: any = [];

  /** Mention */
  @ViewChild('autocompleteTrigger') autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false }) auto!: MatAutocomplete;
  mentionMembers = signal<any>([]);
  activeSuggestionIndex = 0;
  lastKeyEventTimestamp = 0;

  /** Message action */
  @ViewChild('messageReActionTemplate')
  messageReActionTemplate!: TemplateRef<any>;
  messageReActionOverlayRef!: OverlayRef;
  messageReactionTimeout: any;
  messageReaction = signal<any>(null);
  sendMessageTextChangeBehavior = new BehaviorSubject<string>('');

  /** Forward Message */
  lastPasteEventTimestamp = 0;

  /** Forward Message */
  forwardMessageForm!: FormGroup;
  forwardUsers = signal<any>([]);

  /** Search Message */
  messageSearchTabs = [
    { id: 1, title: 'CHAT_COMPONENT.MESSAGE', type: ChatMessageType.TEXT },
    { id: 2, title: 'COMMON.LABEL.DOCUMENT', type: ChatMessageType.DOC },
    { id: 3, title: 'COMMON.LABEL.IMAGE', type: ChatMessageType.IMAGE },
    { id: 4, title: 'COMMON.LABEL.VIDEO', type: ChatMessageType.VIDEO },
  ];
  messageSearchTabSelected = signal(this.messageSearchTabs[0]);
  messageSearchResult = signal<any>(null);
  isSearching = signal(false);
  messageSearchFilter = signal<any>(null);
  partnerInformation = signal<any>(null);

  /** Edit Message */
  @ViewChild('autocompleteEditMessageTrigger')
  autocompleteEditMessageTrigger!: MatAutocompleteTrigger;
  editMessageMentionMembers = signal<any>([]);
  editMessageSelected = signal<any>(null);
  isUpdateEditMessageSelected = signal(true);

  /** Mobile */
  @ViewChild('mobileDrawer') mobileDrawer!: MatDrawer;
  newGroupConversationMobile: any;

  /** Service */
  websocketService = inject(WebsocketService);
  guestService = inject(GuestService);
  cdr = inject(ChangeDetectorRef);
  uploadFileService = inject(UploadFileService);
  sanitizer = inject(DomSanitizer);
  activatedRoute = inject(ActivatedRoute);
  titleNotificationService = inject(TitleNotificationService);
  notificationService = inject(NotificationService);
  reactionDetails = signal<Reaction[]>([]);
  reactionDetailsOrigin = signal<Reaction[]>([]);
  messageKeyPress = signal<string>('');
  endCodeUriFileDownLoad = endCodeUriFileDownLoad;

  /** Extra */
  timer: any;
  prevTime = new Date();

  /** Drag/drop file */
  isDragOverFile = signal(false);
  dragCounter = 0;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private location: Location,
    private injector: Injector,
  ) {
    super();
    this.addEditDialogSetting = {
      ...this.addEditDialogSetting,
      templateCode: 'newConversation',
    };
    this.otherDialogs = {
      newGroupConversation: {
        header: 'CHAT_COMPONENT.NEW_GROUP',
        templateCode: 'newGroupConversation',
      },
      editGroupConversation: {
        header: 'CHAT_COMPONENT.UPDATE_GROUP',
        templateCode: 'editGroupConversation',
      },
      newConversation: {
        header: 'CHAT_COMPONENT.ADD_CONVERSATION',
        templateCode: 'newConversation',
      },
      forwardMessage: {
        header: 'CHAT_COMPONENT.FORWARD_MESSAGE',
        templateCode: 'forwardMessage',
      },
      leaveGroup: {
        header: 'CHAT_COMPONENT.LEAVE_GROUP',
        templateCode: 'leaveGroup',
      },
      reactionDetails: {
        header: 'CHAT_COMPONENT.REACTION_DETAILS',
        templateCode: 'reactionDetails',
      },
    };
    this.newGroupConversationMobile = toSignal(
      this.injector.get(Store).select(ConversationState.value),
      { initialValue: null }
    );
  }

  override async ngAfterViewInit(): Promise<void> {
    super.ngAfterViewInit();
    this.clearQueryParam('accessToken');
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.myCanvasContext = canvas?.getContext('2d');
    this.myCanvasContext.font = '14px Inter';
    this.widthCompare = this.commonService.smallScreen() ? (document.body.clientWidth) * 0.75 : (document.body.clientWidth - 450) * 0.75;
    const conversationId =
      this.activatedRoute.snapshot.queryParams['conversationId'];
    if (conversationId) {
      await this.guestService.chatMessageUpdateRead({
        conversationId: conversationId,
        readCount: 1000000,
      });
      this.onSelectConversation({ id: conversationId, unreadCount: signal(0) });
      this.clearQueryParam('conversationId');
    }

    if (!this.commonService.smallScreen()) {
      this.notificationService.requestPermission();
    }
  }

  ngOnDestroy(): void {
    // this.websocketService.disconnect();
  }

  async ngOnInit() {
    this.conversationFilterForm = new FormGroup({
      keyword: new FormControl(null),
    });
    this.conversationSelectedFilterForm = new FormGroup({
      keyword: new FormControl(null),
      senderId: new FormControl(null),
      startAt: new FormControl(null),
      endAt: new FormControl(null),
      rangeDate: new FormControl(null),
    });
    this.sendMessageForm = new FormGroup({
      text: new FormControl(null),
      image: new FormControl(null),
      file: new FormControl(null),
      emoji: new FormControl(null),
      replyMessage: new FormControl(null),
    });
    this.addEditForm = new FormGroup({
      id: new FormControl(null),
      keyword: new FormControl(null),
    });
    this.newGroupConversationForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      avatarUrl: new FormControl(null),
      fileUpload: new FormControl(null),
      file: new FormControl(null),
      keyword: new FormControl(null),
      groupConversationMemberArray: new FormArray(
        [],
        [Validators.minLength(1)]
      ),
    });
    this.forwardMessageForm = new FormGroup({
      keyword: new FormControl(null),
      message: new FormControl(null),
      note: new FormControl(null),
    });
    this.groupConversationMemberArray = this.newGroupConversationForm.controls[
      'groupConversationMemberArray'
    ] as FormArray;
    this.onBaseInit();
    this.onListenMessage();
    this.onValueChange();
    const filterConversation = this.conversationFilter;
    delete filterConversation?.endPage;
    await this.onGetConversations(filterConversation);
  }

  onBaseInit() {
    this.activatedRoute.queryParams.subscribe(async (param: any) => {
      if (this.commonService.smallScreen() && param?.receiverId) {
        const user = await this.guestService.conversationGetUserDetail(
          param?.receiverId
        );
        if (user) this.onCreateConversation(user, ChatConversationType.Direct);
      }
    });

    const _emojis =
      Object.keys(constant.emoji).reduce((arr: any, key: string) => {
        arr.push({
          key: key,
          // @ts-ignore
          value: constant.emoji[key],
        });
        return arr;
      }, []) || [];
    this.emojis.set(_emojis);

    this.updateReadMessageIndexBehavior
      .pipe(debounceTime(500))
      .subscribe(async (messageIndex) => {
        if (
          this.conversationSelected()?.unreadCount() &&
          this.coordinateFormInputMessage()?.x &&
          this.coordinateFormInputMessage()?.y
        ) {
          const _lastMessage = document.elementFromPoint(
            this.coordinateFormInputMessage()?.x + 50,
            this.coordinateFormInputMessage()?.y - 40
          );
          const lastMessageId = _lastMessage?.getAttribute('data-id');
          if (lastMessageId) {
            const lastMessageReadIndex =
              this.conversationSelected().messages?.findLastIndex(
                (message: any) => message.lastMessageRead
              );
            const lastMessageIndex =
              this.conversationSelected().messages?.findLastIndex(
                (message: any) => message.id === lastMessageId
              );
            const readCount =
              this.conversationSelected()
                ?.messages?.slice(lastMessageReadIndex, lastMessageIndex)
                ?.filter(
                  (mess: any) =>
                    mess.role === MessageRole.MEMBER &&
                    mess.type !== MessageViewType.DATE_GROUP
                )?.length ?? 0;

            if (readCount > 0) {
              const args = {
                conversationId: this.conversationSelected().id,
                lastMessageReadId:
                  this.conversationSelected().messages[lastMessageIndex]?.id,
                readCount: Math.sqrt(readCount),
              };
              // this.commonService.setRemoveShowGlobalLoading(true)
              // await this.guestService.chatMessageUpdateRead(args)
            }
          }
        }
      });

    this.timer = setInterval(async () => {
      const currentTime = new Date();
      if (getDate(this.prevTime) !== getDate(currentTime)) {
        this.prevTime = currentTime;
        await this.onGetConversations({
          keyword: '',
          page: 0,
          size: 100,
        });
      }
    }, 60000)
  }

  onValueChange() {
    this.forwardMessageForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => {
        if (value) {
          const responses = await Promise.all([
            this.guestService.conversationGetUserFullOrgChartList({
              keyword: value ?? '',
              page: 0,
              size: 20,
            }),
            this.guestService.chatConversationList({
              keyword: value ?? '',
              page: 0,
              size: 20,
              type: ChatConversationType.Group,
            }),
          ]);
          const _conversations =
            responses[1]?.conversations?.reduce((arr: any, curr) => {
              arr.push({
                id: curr.id,
                fullname: curr.name,
                type: ChatConversationType.Group,
                departmentName: 'Nhóm tin nhắn',
                titleName: `${curr?.members?.length || 0} thành viên`,
              });
              return arr;
            }, []) || [];

          // const response = await this.guestService.conversationGetUserList({
          //   keyword: value ?? '',
          //   page: 0,
          //   size: 20
          // })
          const _officeUsers = responses[0]?.officeUsers?.filter(
            (user) => user.id !== this.user.id
          );
          this.searchUserList.set([...(_officeUsers || []), ..._conversations]);
        }
      });
    this.conversationSelectedFilterForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => {
        if (value?.trim()?.length > 1) {
          await this.onSearchMessage(this.messageSearchTabSelected());
        }
      });
    this.addEditForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => {
        if (value) {
          await this.onSearchUser(ChatConversationType.Direct);
        }
      });
    this.newGroupConversationForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => {
        if (value) {
          await this.onSearchUser(ChatConversationType.Group);
        }
      });
    this.conversationFilterForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => {
        // if (value) {
        await this.onGetConversations({
          keyword: value || '',
          page: 0,
          size: 100,
        });
        // }
      });
  }

  async onGetConversations(filter?: any) {
    const response = await this.guestService.chatConversationList(filter);
    if (response) {
      const _conversations =
        response?.conversations?.reduce((arr: any, item) => {
          let lastMessage = '';
          switch (item.lastMessage?.type) {
            case ChatMessageType.TEXT:
            case ChatMessageType.LOCATION:
              lastMessage =
                item.lastMessage?.message?.replace(
                  this.mentionRegex,
                  (match: any) => {
                    const mentionUser = item.lastMessage?.mentionTo?.find(
                      (item: any) => `[@${item.id}]` === match
                    );
                    return match !== '[@all]'
                      ? `@${mentionUser?.fullname || ''}`
                      : `@All`;
                  }
                ) || '';
              break;
            case ChatMessageType.DOC:
              lastMessage = `[File]${item.lastMessage?.fileName}`;
              break;
            case ChatMessageType.IMAGE:
              lastMessage = `[Image]`;
              break;
            case ChatMessageType.VIDEO:
              lastMessage = `[Video]`;
              break;
            case ChatMessageType.AUDIO:
              lastMessage = `[Audio]`;
              break;
            case ChatMessageType.LOG:
              lastMessage = this.generateActionText(item.lastMessage);
              break;
          }
          let _conversation: any = {
            ...item,
            tempId: null,
            receiverId: null,
            avatarColor: this.commonService.randomColor('#FFFFFF'),
            messages: [],
            unreadCount: signal(item?.personalConversation?.unreadCount || 0),
            lastMessage: {
              ...item?.lastMessage,
              message: lastMessage,
            },
            isToday: item?.lastMessageAt
              ? compareAsc(startOfDay(new Date(item.lastMessageAt)), startOfDay(new Date())) === 0
              : false,
          };
          arr.push(_conversation);
          return arr;
        }, []) || [];
      if (filter?.page)
        this.conversations.update((value) => [
          ...this.conversations(),
          ..._conversations,
        ]);
      else this.conversations.update((value) => [..._conversations]);
      this.conversationFilter = {
        ...filter,
        endPage:
          !response?.conversations?.length ||
          (response?.conversations?.length < filter?.size && filter.page === 0),
      };
      if (this.commonService.smallScreen() && this.newGroupConversationMobile()) {
        const conversationSelected = this.conversations().find((conv: any) => conv.id === this.newGroupConversationMobile()?.id);
        this.onSelectConversation(conversationSelected);
        this.injector.get(Store).dispatch(Reset);
      }
      const unreadCount = this.conversations()?.reduce((total:number, conv:any) => {
        if (conv?.unreadCount() > 0) total += conv?.unreadCount();
        return total;
      }, 0)
      this.commonService.messageNotification.set({
        unreadCount,
        conversationSelectedId: this.conversationSelected()?.id,
      })
    }
  }

  async onSelectConversation(conversation: any) {
    if (conversation.id === this.conversationSelected()?.id) return;
    this.conversationSelected.set(conversation);
    this.senderTyping.set(null);
    this.isSearching.set(false);
    this.messageSearchResult.set(null);
    this.messageSearchFilter.set(null);
    this.conversationSelectedFilterForm.reset();
    this.commonService.fullScreen.set(true);
    this.sendMessageForm.reset();
    this.messageFiles = [];
    this.drawer?.close();
    if (document.querySelector('[contenteditable]')) {
      // @ts-ignore
      document.querySelector('[contenteditable]').innerHTML = '';
    }
    setTimeout(() => {
      const element = document.getElementById(
        this.commonService.smallScreen()
          ? 'mobile-contenteditable-input-text-message'
          : 'contenteditable-input-text-message'
      );
      // element?.replaceWith(element?.cloneNode(true))
      const _elementClone = element?.cloneNode(true);
      _elementClone?.addEventListener('paste', (event: any) => {
        this.onResizeTextboxChat();
        if (event.clipboardData) {
          const items = event.clipboardData.items;
          let textContent = '';
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith('image/')) {
              // Get the file (image)
              const file = items[i].getAsFile();
              if (file) {
                const reader = new FileReader();
                // Convert image file to a Data URL
                reader.onload = (e) => {
                  const checkFile = this.messageFiles?.find(
                    (_file: any) =>
                      _file.fileName === file?.name &&
                      _file.mimetype === file.type
                  );
                  if (!checkFile)
                    this.messageFiles.push({
                      file: file,
                      url: e.target?.result as string,
                      type: ChatMessageType.IMAGE,
                      fileName: checkFile
                        ? `${file?.name}_${uuid.v4()}`
                        : file?.name,
                      mimetype: file?.type,
                      size: file?.size,
                      complete: false,
                      path: '',
                      error: '',
                    });
                  this.conversationSelected.update((value) =>
                    Object.assign({}, value, { multipleLineTextbox: true })
                  );
                };
                reader.readAsDataURL(file);
              }
              // Prevent the default paste action
              event.preventDefault();
              return;
            }
          }
        }
        if (event.clipboardData?.getData('text')?.trim()?.length) {
          event.preventDefault();
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          range?.setStart(
            selection?.focusNode as Node,
            selection?.focusOffset as number
          );
          range?.setEnd(
            selection?.focusNode as Node,
            selection?.focusOffset as number
          );
          range?.deleteContents();
          range?.collapse(false);
          const textElement = document.createTextNode(
            event.clipboardData.getData('text')
          );
          range?.insertNode(textElement);
          range?.setEndAfter(textElement);
          range?.setStartAfter(textElement);
          selection?.removeAllRanges();
          selection?.addRange(range as Range);
          if (!this.sendMessageForm.value?.text?.length)
            this.sendMessageForm.controls['text'].setValue(
              event.clipboardData?.getData('text')?.trim()
            );
        }
      });
      element?.replaceWith(_elementClone as Node);
    });
    if (conversation.id !== conversation.tempId) {
      const filter = {
        ...this.conversationMessageFilter,
        conversationId: conversation.id,
        lastKey: null,
      };
      await Promise.all([
        this.onGetConversationDetail(conversation.id),
        this.onGetMessage(filter),
      ]);
      setTimeout(() => {
        const formInputMessage = document.getElementById(
          this.commonService.smallScreen()
            ? 'mobile-form-input-text-message'
            : 'form-input-text-message'
        );
        this.coordinateFormInputMessage.set({
          x: formInputMessage?.getBoundingClientRect().x,
          y: formInputMessage?.getBoundingClientRect().y,
        });
      });
    }
    this.countUnreadMessageGlobal()
  }

  onRemoveFile(index: number) {
    if (this.messageFiles?.length) this.messageFiles.splice(index, 1);
    else this.onResizeTextboxChat();
  }

  async onGetConversationDetail(conversationId: string) {
    const response = await this.guestService.chatConversationDetail(
      conversationId
    );
    if (response) {
      const isAdmin = response?.members?.find(
        (member) => member.user?.id === this.user.id && member.admin
      );

      // xoá đếm số tin nhắn
      this.conversations.update(currentArr =>
        currentArr.map((item: any) =>
          item.id === response.id ? { ...item, unreadCount: signal(0) } : item
        )
      );

      this.conversationSelected.update((currValue) =>
        Object.assign({}, currValue, {
          ...response,
          members: [
            // {
            //   user: {
            //     id: 'all',
            //     fullname: 'Tất cả'
            //   }
            // },
            ...(response?.members || []),
          ],
          isAdmin: !!isAdmin,
          createdAt: response?.createdAt,
          creator: response?.creator,
        })
      );
    }
  }

  async onConversationScrolledIndexChange(index: number) {
    if (
      index === this.conversations().length - 1 &&
      !this.conversationFilter?.endPage
    ) {
      const filter = {
        ...this.conversationFilter,
        page: this.conversationFilter.page + 1,
      };
      delete filter.endPage;
      await this.onGetConversations(filter);
    }
  }

  async onSearchInConversation() {
    this.conversationSelected.update((currentValue) =>
      Object.assign({}, currentValue, {
        showSearch: true,
        showInfo: false,
        showMember: false,
      })
    );
    this.messageSearchFilter.set(null);
    this.messageSearchResult.set(null);
    if (this.commonService.smallScreen()) {
      this.commonService.slideNavConfig.update((currValue) =>
        Object.assign({}, currValue, {
          position: 'end',
          disableClose: true,
        })
      );
      this.commonService.openSlideNav.set(true);
    } else this.drawer?.open();
    // await this.onSearchMessage(this.messageSearchTabs[0])
  }

  onShowMemberGroup() {
    this.conversationSelected.update((currentValue) =>
      Object.assign({}, currentValue, {
        showSearch: false,
        showInfo: false,
        showMember: true,
      })
    );
    if (this.commonService.smallScreen()) {
      this.commonService.slideNavConfig.update((currValue) =>
        Object.assign({}, currValue, {
          position: 'end',
          disableClose: true,
        })
      );
      this.commonService.openSlideNav.set(true);
    } else this.drawer?.open();
  }

  onShowPartnerInfo() {
    if (this.conversationSelected()?.type === ChatConversationType.Group)
      return;
    const _partner = this.conversationSelected()?.members?.find(
      (mem: any) => mem?.user?.id !== this.user?.id
    );
    this.partnerInformation.set(_partner);
    this.conversationSelected.update((currentValue) =>
      Object.assign({}, currentValue, {
        showSearch: false,
        showMember: false,
        showInfo: true,
      })
    );
    if (this.commonService.smallScreen()) {
      this.commonService.slideNavConfig.update((currValue) =>
        Object.assign({}, currValue, {
          position: 'end',
          disableClose: true,
        })
      );
      this.commonService.openSlideNav.set(true);
    } else this.drawer?.open();
  }

  onCloseSearchInConversation() {
    this.conversationSelected.update((currentValue) =>
      Object.assign({}, currentValue, {
        showSearch: false,
        showMember: false,
        showInfo: false,
      })
    );
    this.drawer?.close();
    this.messageSearchSelected.set(null);
    this.partnerInformation.set(null);
    this.commonService.openSlideNav.set(false);
    this.conversationSelectedFilterForm.reset();
  }

  onBackToChatList() {
    this.conversationSelected.set(null);
    this.commonService.fullScreen.set(false);
  }

  /** Thêm cuộc hội thoại */
  onUploadAvatar(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.newGroupConversationForm.patchValue({
        avatarUrl: e.target?.result,
        fileUpload: event.target.files[0],
      });
    };
    reader.readAsDataURL(file);
  }

  onNewConversation(type: ChatConversationType) {
    switch (type) {
      case ChatConversationType.Direct:
        this.addEditDialogSetting = {
          ...this.otherDialogs['newConversation'],
          header: 'Thêm cuộc hội thoại',
          btnOK: '',
          btnCancel: '',
          btnDelete: '',
        };
        this.addEditForm.reset();
        break;
      case ChatConversationType.Group:
        this.addEditDialogSetting = {
          ...this.otherDialogs['newGroupConversation'],
          header: 'Thêm nhóm chat',
          btnOK: 'Thêm nhóm',
          btnCancel: 'Hủy',
        };
        this.newGroupConversationForm.reset();
        this.groupConversationMemberArray.clear();
        break;
    }
    this.searchUserList.update(() => []);
    this.visibleAddEditDialog = true;
  }

  onEditConversation(type: ChatConversationType) {
    switch (type) {
      case ChatConversationType.Direct:
        break;
      case ChatConversationType.Group:
        this.addEditDialogSetting = {
          ...this.otherDialogs['newGroupConversation'],
          header: 'Cập nhật nhóm chat',
          btnOK: 'Lưu',
          btnCancel: 'Hủy',
        };
        this.newGroupConversationForm.reset();
        this.newGroupConversationForm.patchValue({
          id: this.conversationSelected().id,
          name: this.conversationSelected().name,
          avatarUrl: this.conversationSelected().imgUrl,
        });
        this.groupConversationMemberArray.clear();
        this.conversationSelected().members?.map((mem: any) => {
          this.groupConversationMemberArray.push(
            new FormGroup({
              id: new FormControl(mem.user.id),
              fullname: new FormControl(mem.user.fullname),
              imageUrls: new FormControl(mem.user.imageUrls),
            })
          );
        });
        break;
    }
    this.searchUserList.update(() => []);
    this.visibleAddEditDialog = true;
  }

  async onDeleteConversation() {
    const response = await this.guestService.conversationDelete({
      conversationId: this.conversationSelected().id,
    });
    if (response) {
      const _conversations = _.cloneDeep(this.conversations());
      const conversationIndex = _conversations.findIndex(
        (conversation: any) =>
          conversation.id === this.conversationSelected().id
      );
      _conversations.splice(conversationIndex, 1);
      this.conversations.update((value) => [..._conversations]);
      this.conversationSelected.set(null);
    }
  }

  async onSearchUser(type: ChatConversationType) {
    const filter = {
      keyword:
        type === ChatConversationType.Direct
          ? this.addEditForm.value.keyword
          : this.newGroupConversationForm.value.keyword,
      page: 0,
      size: 20,
      onlyActive: true,
    };
    const memberGroupIds =
      this.groupConversationMemberArray
        ?.getRawValue()
        ?.map((item) => item.id) || [];
    const response =
      await this.guestService.conversationGetUserFullOrgChartList(filter);
    const _officeUsers =
      response?.officeUsers?.reduce((arr: any, item) => {
        arr.push({
          ...item,
          isMemberGroup: memberGroupIds?.includes(item.id),
        });
        return arr;
      }, []) || [];
    // this.searchUserList.set(response?.officeUsers || [])
    this.searchUserList.set(_officeUsers);
  }

  async onCreateConversation(item: any, type: ChatConversationType) {
    this.drawer?.close();
    switch (type) {
      case ChatConversationType.Direct:
        const _tempId = uuid.v4();
        const newConversation = {
          id: _tempId,
          tempId: _tempId,
          receiverId: item.id,
          groupType: null,
          lastMessageAt: new Date(),
          lastMessageId: '',
          type: ChatConversationType.Direct,
          name: item.fullname,
          messages: [],
          unreadCount: signal(0),
          imgUrl: item.imageUrls?.[0] || '',
        };
        const conversationDetail =
          await this.guestService.chatConversationDetail('', item.id);
        if (!conversationDetail) {
          const checkConversation = this.conversations()?.find(
            (conv: any) =>
              conv.id === conv.tempId && conv.receiverId === item.id
          );
          if (!checkConversation) {
            const _conversations = _.cloneDeep(this.conversations())?.filter(
              (conv: any) => conv.id !== conv.tempId
            );
            this.conversations.update((value) => [
              newConversation,
              ..._conversations,
            ]);
            this.conversationSelected.set(newConversation);
          }
        } else {
          const conversations = _.cloneDeep(this.conversations());
          const conversationIndex = conversations?.findIndex(
            (it: any) => it.id === conversationDetail.id
          );
          if (conversationIndex !== -1)
            conversations.splice(conversationIndex, 1);
          this.conversations.update((value) => [
            {
              ...conversationDetail,
              unreadCount: signal(0),
            },
            ...conversations,
          ]);
          await this.onSelectConversation({
            ...conversationDetail,
            unreadCount: signal(0),
          });
        }
        this.visibleAddEditDialog = false;
        break;
      case ChatConversationType.Group:
        const checkUserExist = this.groupConversationMemberArray
          .getRawValue()
          ?.find((it) => it.id === item.id);
        if (checkUserExist) return;
        this.groupConversationMemberArray.push(
          new FormGroup({
            id: new FormControl(item.id),
            fullname: new FormControl(item.fullname),
            imageUrls: new FormControl(item.imageUrls),
          })
        );
        break;
    }
  }

  override async onCloseAddEditDialog(event: any) {
    if (event?.submit)
      switch (this.addEditDialogSetting.templateCode) {
        case 'newConversation':
          break;
        case 'newGroupConversation':
          this.newGroupConversationForm.markAllAsTouched();
          if (this.newGroupConversationForm.invalid) return;
          let args: any = {
            name: this.newGroupConversationForm.value.name,
            groupType: ChatConversationGroupType.Public,
            memberIds: [
              ...this.groupConversationMemberArray
                .getRawValue()
                ?.map((it) => it.id),
              // this.user.id
            ],
          };
          if (this.newGroupConversationForm.value.fileUpload) {
            const uploadLinkResponse =
              await this.uploadFileService.storageGeneratePresignedUrls({
                files: [
                  {
                    fileName:
                      this.newGroupConversationForm.value.fileUpload.name,
                    fileType:
                      this.newGroupConversationForm.value.fileUpload.type,
                  },
                ],
              });
            if (uploadLinkResponse) {
              args = {
                ...args,
                imgUrl: uploadLinkResponse.data?.[0]?.url,
              };
              this.commonService.setRemoveShowGlobalLoading(true);
              this.uploadFileService
                .uploadMessageFileS3Observable(
                  this.newGroupConversationForm.value.fileUpload,
                  uploadLinkResponse.data?.[0]?.presignedUrl
                )
                .subscribe(() => {
                  this.conversationSelected.update((value) =>
                    Object.assign({}, value, {
                      imgUrl: uploadLinkResponse.data?.[0]?.url,
                    })
                  );
                  const conversations = _.cloneDeep(this.conversations());
                  const groupIndex = conversations.findIndex(
                    (conversation: any) =>
                      conversation.id === this.conversationSelected().id
                  );
                  conversations[groupIndex] = {
                    ...conversations[groupIndex],
                    imgUrl: uploadLinkResponse.data?.[0]?.url,
                  };
                  this.conversations.update(() => [...conversations]);
                });
            }
          }
          if (this.newGroupConversationForm.value.id) {
            const updateResponse =
              await this.guestService.conversationGroupEdit({
                ...args,
                conversationId: this.newGroupConversationForm.value.id,
              });
            if (updateResponse) {
              this.conversationSelected.update((value) =>
                Object.assign({}, value, {
                  members: updateResponse.members,
                  name: updateResponse.name,
                  imgUrl: updateResponse.imgUrl,
                })
              );
              const conversations = _.cloneDeep(this.conversations());
              const groupIndex = conversations.findIndex(
                (conversation: any) => conversation.id === updateResponse.id
              );
              conversations[groupIndex] = {
                ...conversations[groupIndex],
                name: updateResponse.name,
                imgUrl: updateResponse.imgUrl,
              };
              this.conversations.update(() => [...conversations]);
              this.visibleAddEditDialog = false;
            }
          } else {
            const response = await this.guestService.conversationGroupAdd(args);
            if (response) {
              this.commonService.openSnackBar('Tạo nhóm thành công');
              let _conversation: any = {
                ...response,
                tempId: null,
                receiverId: null,
                avatarColor: this.commonService.randomColor('#FFFFFF'),
                messages: [],
                unreadCount: signal(0),
              };
              this.conversations.update((currValue) => [
                _conversation,
                ...currValue,
              ]);
              this.conversationSelected.set(_conversation);
              await this.onGetConversationDetail(response.id);
              this.visibleAddEditDialog = false;
            }
          }
          break;
        case 'forwardMessage':
          if (this.forwardUsers().length) {
            const _forwardUsers = _.cloneDeep(this.forwardUsers());
            this.commonService.setRemoveShowGlobalLoading(true);
            this.visibleAddEditDialog = false;
            const responses = await Promise.all(
              _forwardUsers.map((user: any) => {
                let args: any = {
                  forwardedFromMessageId:
                    this.forwardMessageForm.value['message'].id,
                  type: this.forwardMessageForm.value['message'].type,
                  message: this.forwardMessageForm.value['message'].message,
                  urls: this.forwardMessageForm.value['message'].urls,
                };
                if (user?.type === ChatConversationType.Group)
                  args = {
                    ...args,
                    conversationId: user.id,
                  };
                else
                  args = {
                    ...args,
                    receiverId: user.id,
                  };
                return this.guestService.chatMessageAdd(args);
              })
            );
            const _conversations =
              responses?.reduce((arr, response, index) => {
                const _conversation = this.conversations().find(
                  (conv: any) => conv.id === response?.conversationId
                );
                if (!_conversation && response)
                  arr.push({
                    id: response.conversationId,
                    tempId: '',
                    receiverId: '',
                    groupType: null,
                    lastMessageAt: response.createdAt,
                    lastMessageId: '',
                    type: ChatConversationType.Direct,
                    name: _forwardUsers?.[index]?.fullname,
                    avatarColor: this.commonService.randomColor('#FFFFFF'),
                    messages: [],
                    unreadCount: signal(0),
                  });
                return arr;
              }, []) || [];
            this.conversations.update((currValue) => [
              ..._conversations,
              ...currValue,
            ]);
            this.visibleAddEditDialog = false;
          }
          break;
        case 'leaveGroup':
          break;
      }
    else if (event?.delete) {
      switch (this.addEditDialogSetting.templateCode) {
        case 'leaveGroup':
          const _learGroupArgs = {
            conversationId: this.conversationSelected()?.id,
          };
          const leaveGroupResponse = await this.guestService.conversationLeave(
            _learGroupArgs
          );
          if (leaveGroupResponse) {
            const _conversations = _.cloneDeep(this.conversations());
            const _conversationIndex = _conversations?.findIndex(
              (conv: any) => conv.id === this.conversationSelected()?.id
            );
            _conversations.splice(_conversationIndex, 1);
            this.conversations.update((value) => [..._conversations]);
            this.conversationSelected.set(null);
          }
          this.visibleAddEditDialog = false;
          this.drawer?.close();
          break;
      }
    } else {
      this.visibleAddEditDialog = false;
      this.forwardUsers.set([]);
    }
  }

  replaceFirstUUID(input: string, newUUID: string): string {
    const uuidRegex = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
    return input.replace(uuidRegex, newUUID);
  }

  /** Gửi tin nhắn */
  onListenMessage() {
    // Connect websocket
    // this.websocketService.connect();

    // Tin nhắn mới
    this.websocketService.on('message:sent', async (data) => {
      // console.log('message:sent', data);
      if (data.message?.senderId !== this.user.id) {
        // this.titleNotificationService.startBlinkingNotification();
        if (!this.commonService.smallScreen()) {
          let mess = data.message?.message;
          if (mess.match(this.mentionRegex)?.length) {
            const mentions = data.message?.mentionTo?.map((x: { fullname: any; }) => x.fullname).join(', ');
            mess = this.replaceFirstUUID(data.message?.message, mentions)
          }
          this.notificationService.showNotification(
            '💬 ' + data.message?.sender?.fullname,
            mess,
            data.conversationId
          );
        }

      }
      if (
        this.conversationSelected()?.id === data.conversationId &&
        this.conversationSelected() &&
        data.message?.senderId !== this.user.id
      ) {
        // || (this.conversationSelected()?.id !== data.conversationId && this.conversationSelected()?.id === this.conversationSelected()?.tempId && data.message?.senderId === this.user.id)
        let _newMessage = {
          ...data.message,
          role: MessageRole.MEMBER,
          firstMessage: false,
        };
        const sender = this.conversationSelected()?.members?.find(
          (member: any) => member?.user?.id === data.message?.senderId
        );
        _newMessage = {
          ..._newMessage,
          sender: {
            ...(_newMessage.sender || {}),
            ...(sender?.user || {}),
          },
        };
        if (urlVerify(_newMessage.message))
          _newMessage = {
            ..._newMessage,
            message: _newMessage.message.replace(/\r?\n/g, '<br>'),
            hasLink: urlVerify(data.message?.message),
            urlHTML: urlModify(data.message?.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
            innerHTML: this.sanitizer.bypassSecurityTrustHtml(
              urlModify(data.message?.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
            ),
            previewLink: _.last(data.message?.message?.match(this.urlRegex)),
          };
        if (_newMessage.message.match(this.mentionRegex)?.length) {
          const _messageMention = _newMessage.message.replace(
            this.mentionRegex,
            (match: any) => {
              const mentionUser = this.conversationSelected()?.members?.find(
                (item: any) => `[@${item.user.id}]` === match
              );
              return match !== '[@all]'
                ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                `data-id="${mentionUser?.user?.id}" data-fullname="${mentionUser?.user?.fullname}">` +
                `@${mentionUser?.user?.fullname || ''}</span>`
                : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                `data-id="all" data-fullname="Tất cả">` +
                `@All</span>`;
            }
          ).replace(/\r?\n/g, '<br>');
          _newMessage = {
            ..._newMessage,
            hasMention: true,
            mentionHTML: urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
            innerHTML: this.sanitizer.bypassSecurityTrustHtml(
              urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
            ),
          };
        }
        const lastMessage: any = _.last(this.conversationSelected()?.messages);
        if (
          (lastMessage?.role && lastMessage?.role !== _newMessage?.role) ||
          lastMessage?.sender?.id !== _newMessage?.sender?.id ||
          lastMessage?.type === this.MessageViewType.LOG
        )
          _newMessage.firstMessage = true;
        if (
          compareAsc(
            startOfDay(new Date(lastMessage?.createdAt)),
            startOfDay(new Date())
          ) !== 0 ||
          !this.conversationSelected()?.messages?.length
        ) {
          _newMessage.firstMessage = true;
          const _newMessageDateGroup = {
            id: uuid.v4(),
            type: this.MessageViewType.DATE_GROUP,
            role: null,
            user: null,
            createdAt: new Date(),
            message: format(new Date(), 'dd/MM/yyyy'),
            firstMessage: false,
          };
          this.conversationSelected.update((currValue) =>
            Object.assign({}, currValue, {
              messages: [
                ...currValue.messages,
                _newMessageDateGroup,
                _newMessage,
              ],
            })
          );
        } else {
          this.conversationSelected.update((currValue) =>
            Object.assign({}, currValue, {
              messages: [...currValue.messages, _newMessage],
            })
          );
        }

        const _conversations = _.cloneDeep(this.conversations());
        const conversationIndex = _conversations.findIndex(
          (conv: any) => conv.id === this.conversationSelected().id
        );
        if (conversationIndex > -1) {
          let lastMessage = '';
          switch (data?.message?.type) {
            case ChatMessageType.TEXT:
              lastMessage =
                data?.message?.message?.replace(
                  this.mentionRegex,
                  (match: any) => {
                    const mentionUser = data?.message?.mentionTo?.find(
                      (item: any) => `[@${item.id}]` === match
                    );
                    return match !== '[@all]'
                      ? `@${mentionUser?.fullname || ''}`
                      : `@All`;
                  }
                ) || '';
              break;
            case ChatMessageType.DOC:
              lastMessage = `[File]${data?.message?.fileName}`;
              break;
            case ChatMessageType.IMAGE:
              lastMessage = `[Image]`;
              break;
            case ChatMessageType.VIDEO:
              lastMessage = `[Video]`;
              break;
            case ChatMessageType.LOG:
              lastMessage = this.generateActionText(data?.message);
              break;
          }
          _conversations[conversationIndex] = {
            ..._conversations[conversationIndex],
            lastMessage: {
              ..._conversations[conversationIndex].lastMessage,
              id: data?.message?.id,
              message: lastMessage,
            },
            lastMessageAt: data?.message?.createdAt,
            isToday: compareAsc(
              startOfDay(new Date(data?.message?.createdAt)),
              startOfDay(new Date())
            ) === 0,
          };
          // if (this.conversationSelected()?.id === this.conversationSelected()?.tempId && data.message?.senderId === this.user.id) {
          //   _conversations[conversationIndex] = {
          //     ..._conversations[conversationIndex],
          //     id: data.conversationId,
          //     tempId: null
          //   }
          //   this.conversationSelected.update((currValue) => Object.assign({}, currValue, {
          //     id: data.conversationId,
          //     tempId: null
          //   }))
          // }
          this.conversations.update((currValue) => [..._conversations]);
        }
        this.commonService.setRemoveShowGlobalLoading(true);
        await this.guestService.chatMessageUpdateRead({
          conversationId: this.conversationSelected()?.id,
          readCount: 1000000,
        });

        setTimeout(() => {
          const messElement = document.getElementById(
            `parent_${_newMessage.id}`
          );
          document
            .getElementById(
              this.commonService.smallScreen()
                ? 'mobile_messageDiv'
                : 'messageDiv'
            )
            ?.scrollTo({
              behavior: 'instant',
              top: messElement?.offsetTop,
            });
        });
      } else if (this.conversationSelected()?.id !== data.conversationId) {
        this.titleNotificationService.startBlinkingNotification();
        const _conversations = _.cloneDeep(this.conversations());
        const conversationIndex = _conversations.findIndex(
          (conv: any) => conv.id === data.conversationId
        );
        if (conversationIndex > -1) {
          let lastMessage = '';
          switch (data?.message?.type) {
            case ChatMessageType.TEXT:
              lastMessage =
                data?.message?.message?.replace(
                  this.mentionRegex,
                  (match: any) => {
                    const mentionUser = data?.message?.mentionTo?.find(
                      (item: any) => `[@${item.id}]` === match
                    );
                    return match !== '[@all]'
                      ? `@${mentionUser?.fullname || ''}`
                      : `@All`;
                  }
                ) || '';
              break;
            case ChatMessageType.DOC:
              lastMessage = `[File]${data?.message?.fileName}`;
              break;
            case ChatMessageType.IMAGE:
              lastMessage = `[Image]`;
              break;
            case ChatMessageType.VIDEO:
              lastMessage = `[Video]`;
              break;
          }

          _conversations[conversationIndex] = {
            ..._conversations[conversationIndex],
            unreadCount: signal(
              (_conversations[conversationIndex]?.unreadCount() || 0) + 1
            ),
            lastMessage: {
              ..._conversations[conversationIndex].lastMessage,
              id: data?.message?.id,
              message: lastMessage,
            },
            lastMessageAt: data?.message?.createdAt,
            isToday: compareAsc(
              startOfDay(new Date(data?.message?.createdAt)),
              startOfDay(new Date())
            ) === 0,
          };
          const cloneConversation = _.cloneDeep(
            _conversations[conversationIndex]
          );
          _conversations.splice(conversationIndex, 1);
          this.conversations.update((currValue) => [
            cloneConversation,
            ..._conversations,
          ]);
        } else {
          this.commonService.setRemoveShowGlobalLoading(true);
          const newConversationResponse =
            await this.guestService.chatConversationDetail(data.conversationId);
          if (newConversationResponse) {
            const newConversation = {
              ...newConversationResponse,
              unreadCount: signal(
                newConversationResponse?.personalConversation?.unreadCount || 0
              ),
            };
            if (data.message?.senderId !== this.user.id) {
              this.conversations.update((currValue) => [
                newConversation,
                ...currValue,
              ]);
            } else {
              const conversations = _.cloneDeep(this.conversations()).filter(
                (conv: any) => conv.id && conv.id !== conv.tempId
              );
              this.conversations.update((currValue) => [
                newConversation,
                ...conversations,
              ]);
            }
            this.websocketService.emit('conversation:joined', {
              conversationId: data.conversationId,
            });
          }
        }
      }
      this.countUnreadMessageGlobal()
    });

    // Đang soạn tin nhắn
    this.websocketService.on('message:typing', (data) => {
      // console.log('message:typing', data)
      if (this.conversationSelected()?.id === data?.conversationId)
        this.senderTyping.set(data);
      else this.senderTyping.set(null);
    });
    this.sendMessageTextChangeBehavior
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.websocketService.emit('message:typing', {
          conversationId: this.conversationSelected()?.id,
          isTyping:
            !!document.querySelector('[contenteditable]')?.textContent?.length,
        });
      });

    // Reaction
    this.websocketService.on('message:reaction', (result) => {
      // console.log('message:reaction', result);
      if (result?.data?.conversationId === this.conversationSelected()?.id) {
        const _messages = this.conversationSelected()?.messages || [];
        const _messageIndex = _messages?.findIndex(
          (mess: any) => mess.id === result?.data.messageId
        );
        if (_messageIndex > -1) {
          const reactionCodeIndex = _messages[
            _messageIndex
          ].reactions?.findIndex(
            (reaction: any) => reaction.code === result?.data.code
          );
          if (reactionCodeIndex > -1) {
            _messages[_messageIndex].reactions?.[
              reactionCodeIndex
            ]?.reactors?.push({ fullname: result?.reactor?.fullname });
          } else {
            _messages[_messageIndex].reactions =
              _messages[_messageIndex].reactions || [];
            _messages[_messageIndex].reactions?.push({
              code: result?.data.code,
              reactors: [
                {
                  fullname: result?.reactor?.fullname,
                },
              ],
            });
          }
          this.conversationSelected.update((currValue) =>
            Object.assign({}, currValue, {
              messages: _messages,
            })
          );
        }
      }
    });

    // Xóa khỏi nhóm
    this.websocketService.on('conversation:leaved', async (data) => {
      // console.log('conversation:leaved', data);
      this.websocketService.emit('conversation:leaved', {
        conversationId: this.conversationSelected()?.id,
      });
      const _conversations = _.cloneDeep(this.conversations());
      const conversationIndex = _conversations.findIndex(
        (it: any) => it.id === data.conversationId
      );
      _conversations.splice(conversationIndex, 1);
      this.conversations.update(() => [..._conversations]);
      if (this.conversationSelected()?.id === data.conversationId) {
        this.conversationSelected.set(null);
      }
    });

    // Thêm vào nhóm
    this.websocketService.on('conversation:joined', async (data) => {
      // console.log('conversation:joined', data);
      this.websocketService.emit('conversation:joined', {
        conversationId: data?.conversationId,
      });
      if (this.conversationSelected()?.id !== data.conversationId) {
        this.commonService.setRemoveShowGlobalLoading(true);
        const newConversationResponse =
          await this.guestService.chatConversationDetail(data.conversationId);
        if (newConversationResponse) {
          const newConversation = {
            ...newConversationResponse,
            unreadCount: signal(
              newConversationResponse?.personalConversation?.unreadCount || 0
            ),
          };
          if (data.message?.senderId !== this.user.id) {
            this.conversations.update((currValue) => [
              newConversation,
              ...currValue,
            ]);
          } else {
            const conversations = _.cloneDeep(this.conversations()).filter(
              (conv: any) => conv.id && conv.id !== conv.tempId
            );
            this.conversations.update((currValue) => [
              newConversation,
              ...conversations,
            ]);
          }
        }
      }
    });

    // Xóa tin nhắn
    this.websocketService.on('message:delete', async (data) => {
      if (this.conversationSelected()?.id === data.conversationId) {
        const _messages = _.cloneDeep(this.conversationSelected()?.messages);
        const _messageIndex = _messages.findIndex(
          (mess: any) => mess.id === data.message?.id
        );
        if (_messageIndex > -1) {
          if (
            _messages[_messageIndex]?.firstMessage &&
            _messages[_messageIndex + 1]?.id &&
            _messages[_messageIndex + 1]?.role ===
            _messages[_messageIndex]?.role &&
            _messages[_messageIndex + 1]?.type !==
            this.MessageViewType.DATE_GROUP
          ) {
            _messages[_messageIndex + 1].firstMessage = true;
          }
          _messages.splice(_messageIndex, 1);
          this.conversationSelected.update((currValue) =>
            Object.assign({}, currValue, {
              messages: _messages,
            })
          );
        }
      }
    });

    // sửa tin nhắn
    this.websocketService.on('message:edit', async (data) => {
      // console.log('message:edit', data);

      const _messages = _.cloneDeep(this.conversationSelected()?.messages);
      const _messageIndex = _messages?.findIndex(
        (mess: any) => mess.id === data.message?.id
      );
      if (this.conversationSelected()?.id === data.conversationId) {
        if (_messageIndex > -1) {
          _messages[_messageIndex].message = data.message?.message;
          if (urlVerify(data.message?.message))
            _messages[_messageIndex] = {
              ..._messages[_messageIndex],
              hasLink: urlVerify(data.message?.message),
              urlHTML: urlModify(data.message?.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(data.message?.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
              ),
              previewLink: _.last(data.message?.message?.match(this.urlRegex)),
            };
          if (data.message?.message.match(this.mentionRegex)?.length) {
            const _messageMention = data.message?.message.replace(
              this.mentionRegex,
              (match: any) => {
                const mentionUser = this.conversationSelected()?.members?.find(
                  (item: any) => `[@${item.user.id}]` === match
                );
                return match !== '[@all]'
                  ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="${mentionUser?.user?.id}" data-fullname="${mentionUser?.user?.fullname}">` +
                  `@${mentionUser?.user?.fullname || ''}</span>`
                  : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="all" data-fullname="Tất cả">` +
                  `@All</span>`;
              }
            ).replace(/\r?\n/g, '<br>');
            _messages[_messageIndex] = {
              ..._messages[_messageIndex],
              hasMention: true,
              mentionHTML: urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
              ),
            };
          }

          this.conversationSelected.update((currValue) =>
            Object.assign({}, currValue, {
              messages: _messages,
            })
          );
        }
      }
      if (_messageIndex === _messages.length - 1) {
        const _conversations = _.cloneDeep(this.conversations());
        const conversationIndex = _conversations.findIndex(
          (conv: any) => conv.id === data.conversationId
        );
        if (conversationIndex > -1) {
          let lastMessage = '';
          switch (data?.message?.type) {
            case ChatMessageType.TEXT:
              lastMessage =
                data?.message?.message?.replace(
                  this.mentionRegex,
                  (match: any) => {
                    const mentionUser = data?.message?.mentionTo?.find(
                      (item: any) => `[@${item.id}]` === match
                    );
                    return match !== '[@all]'
                      ? `@${mentionUser?.fullname || ''}`
                      : `@All`;
                  }
                ) || '';
              break;
            case ChatMessageType.DOC:
              lastMessage = `[File]${data?.message?.fileName}`;
              break;
            case ChatMessageType.IMAGE:
              lastMessage = `[Image]`;
              break;
            case ChatMessageType.VIDEO:
              lastMessage = `[Video]`;
              break;
          }
          _conversations[conversationIndex] = {
            ..._conversations[conversationIndex],
            lastMessage: {
              ..._conversations[conversationIndex].lastMessage,
              id: data?.message?.id,
              message: lastMessage,
            },
            lastMessageAt: data?.message?.createdAt,
          };
          this.conversations.update((currValue) => [..._conversations]);
        }
      }
    });
  }

  async onGetMessage(filter: any) {

    this.titleNotificationService.stopBlinkingNotification();
    this.conversationMessageIndex.set(0);
    // const mentionRegex = /\[@[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\]/gm
    const response = await this.guestService.chatMessageList(filter);
    const _lastKey: any = response?.lastKey;
    if (_lastKey) delete _lastKey['__typename'];
    this.conversationMessageFilter = {
      ...filter,
      lastKey: _lastKey,
    };
    const messageGroupByDate = _.groupBy(
      _.reverse(response?.messages || []),
      (value) => {
        return format(value.createdAt as any, 'dd/MM/yyyy');
      }
    );

    const _messages =
      Object.keys(messageGroupByDate)?.reduce((arr: any, key) => {
        const _newMessageDateGroup = {
          id: uuid.v4(),
          type: this.MessageViewType.DATE_GROUP,
          role: null,
          user: null,
          createdAt: string2date(key)?.getTime(),
          message: key,
          firstMessage: false,
        };
        arr.push(_newMessageDateGroup);
        const _arr: any = [];
        messageGroupByDate[key].map((mess: any, index) => {
          let _newMessage: any = {
            ...mess,
            messageEdited: mess.message?.replace(/\\r\\n|\\n|\\r/g, '\n'),
            role:
              this.user?.id === mess.senderId
                ? MessageRole.OWNER
                : MessageRole.MEMBER,
            user: {
              fullName: mess.sender?.fullname,
              avatar: 'assets/images/guest/avatar_default.svg',
            },
            lastMessageRead:
              mess.id ===
              this.conversationSelected().personalConversation
                ?.lastMessageReadId,
            firstMessage: false,
          };
          if (
            _arr[index - 1]?.role !== _newMessage.role ||
            _arr[index - 1]?.type === this.MessageViewType.DATE_GROUP ||
            _arr[index - 1]?.senderId !== _newMessage?.senderId ||
            _arr[index - 1]?.type === this.MessageViewType.LOG
          ) {
            _newMessage.firstMessage = true;
          }
          if (
            [ChatMessageType.TEXT, ChatMessageType.LOCATION].includes(mess.type)
          ) {
            _newMessage = {
              ..._newMessage,
              hasLink: urlVerify(_newMessage.message),
              urlHTML: urlVerify(_newMessage.message)
                ? urlModify(_newMessage.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
                : '',
              innerHTML: urlVerify(_newMessage.message)
                ? this.sanitizer.bypassSecurityTrustHtml(
                  urlModify(_newMessage.message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
                )
                : _newMessage.message,
            };
            if (
              [ChatMessageType.TEXT, ChatMessageType.LOCATION].includes(
                mess.type
              ) &&
              _newMessage?.message?.match(this.urlRegex)?.length
            ) {
              _newMessage = {
                ..._newMessage,
                previewLink: _.last(_newMessage?.message?.match(this.urlRegex)),
              };
            }
          }
          if (mess.message?.match(this.mentionRegex)?.length) {
            // let _messageMention = urlModify(mess.message)
            // const withBr = mess.message.replace(/\\r\\n|\\n|\\r|\r\n|\n|\r/g, '<br/>');
            const _messageMention = mess.message?.replace(
              this.mentionRegex,
              (match: any) => {
                const mentionUser = mess?.mentionTo?.find(
                  (item: any) => `[@${item.id}]` === match
                );
                return match !== '[@all]'
                  ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="${mentionUser?.id}" data-fullname="${mentionUser?.fullname}">` +
                  `@${mentionUser?.fullname || ''}</span>`
                  : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="all" data-fullname="Tất cả">` +
                  `@All</span>`;
              }
            ).replace(/\r?\n/g, '<br>');
            _newMessage = {
              ..._newMessage,
              hasMention: true,
              mentionHTML: urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
              ),
            };
          }
          _arr.push(_newMessage);
        });
        arr.push(..._arr);
        return arr;
      }, []) || [];

    let currentMessages = _.cloneDeep(
      this.conversationSelected()?.messages || []
    );
    const lastDateGroupUpdateMessageIndex = _.findLastIndex(
      _messages,
      (mess: any) => mess.type === this.MessageViewType.DATE_GROUP
    );
    if (
      lastDateGroupUpdateMessageIndex !== -1 &&
      _.head<any>(currentMessages)?.message &&
      _messages[lastDateGroupUpdateMessageIndex].message ===
      _.head<any>(currentMessages)?.message
    ) {
      currentMessages = _.drop(currentMessages);
    }
    const updateListMessages = [..._messages, ...currentMessages];
    const _lastMessageReadIndex = updateListMessages.findIndex(
      (mess: any) => mess.lastMessageRead
    );
    const mentionMessage = updateListMessages
      .slice(_lastMessageReadIndex)
      ?.find(
        (mess) =>
          mess.hasMention &&
          mess.mentionTo?.length &&
          mess.mentionTo.find(
            (mention: any) => mention.id === this.user?.officeUser?.id
          )
      );
    this.conversationSelected.update((currValue) =>
      Object.assign({}, currValue, {
        messages: updateListMessages,
        lastMessageReadIndex: _lastMessageReadIndex,
        mentionMessage: mentionMessage || null,
        unreadCount: signal(this.conversationSelected()?.unreadCount() || 0),
      })
    );
    if (!filter?.lastKey && updateListMessages?.length)
      setTimeout(async () => {
        const lastMessage = _.last<any>(this.conversationSelected()?.messages);
        const messElement = document.getElementById(`parent_${lastMessage.id}`);
        document
          .getElementById(
            this.commonService.smallScreen()
              ? 'mobile_messageDiv'
              : 'messageDiv'
          )
          ?.scrollTo({
            behavior: 'instant',
            top: messElement?.offsetTop,
          });
        if (this.conversationSelected().unreadCount()) {
          const args = {
            conversationId: this.conversationSelected().id,
            readCount: Math.abs(this.conversationSelected().unreadCount()),
          };
          this.commonService.setRemoveShowGlobalLoading(true);
          await this.guestService.chatMessageUpdateRead(args);
          this.conversationSelected().unreadCount.update((value: number) => 0);
          const _conversations = _.cloneDeep(this.conversations());
          const conversationIndex = _conversations.findIndex(
            (it: any) => it.id === args.conversationId
          );
          _conversations[conversationIndex] = {
            ..._conversations[conversationIndex],
            unreadCount: signal(0),
          };
          this.conversations.update(() => [..._conversations]);
        }
      });

  }

  async onLoadMoreMessage(event: any) {
    if (this.conversationMessageFilter?.lastKey) {
      await this.onGetMessage(this.conversationMessageFilter);
    }
    this.onCloseMessageAction(null);
  }

  onScrollMessage(event: any) {
    this.onCloseMessageAction(null);
    const element: any = document.getElementById(
      this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv'
    );
    this.scrollToEnd.update(
      () =>
        Math.abs(element.scrollHeight - element.scrollTop) >
        element.clientHeight + 100
    );
  }

  async onScrollToEndMessage(event: any) {
    const lastMessage = _.last<any>(this.conversationSelected()?.messages);
    const messElement = document.getElementById(`parent_${lastMessage.id}`);
    const element = document.getElementById(
      this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv'
    );
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  onSpacePressMobile() {
    insertSpaceEscapingElementAtCaret('\u00A0')
  }

  onOpenLinkMobile(event: any) {
    const el = event.target as HTMLElement;
    const anchor = el.closest('a[data-url]') as HTMLAnchorElement | null;

    if (!anchor) return; // click không phải vào <a>

    const url = anchor.getAttribute('data-url');

    if (!url) return;

    (window as any).flutter_inappwebview.callHandler('openExternalLink', url);
  }

  onHoldMessageMobile(event: any) {
    const messageId = event.nativeElement.getAttribute('data-id')
    if (messageId) {
      const message = this.conversationSelected()?.messages?.find((item: any) => item.id === messageId)
      this.onShowMessageAction(message)
    }
  }

  async onSendMessageMobile(
    event?: any,
    type: ChatMessageType = ChatMessageType.TEXT,
    sendNow = false
  ) {
    this.onResizeTextboxChat();
    const element = document.getElementById('mobile-contenteditable-input-text-message');
    this.sendMessageForm.patchValue({
      text: `${element?.textContent}${event?.key?.length === 1 ? event?.key : ''
        }`,
    });
    // // Mention
    if (this.onMentionMember(event, element)) return;
    // Send message

    const files: any = [];
    let args: any = null;
    let argsMedia: any = null;
    let _newMessageMedia: any = null;
    let uploadLinkResponses: any = [];
    switch (type) {
      case ChatMessageType.AUDIO:
        break;
      case ChatMessageType.CALL:
        break;
      case ChatMessageType.DOC:
        if (event.target.files?.length) {
          args = {
            receiverId: this.conversationSelected().receiverId,
            conversationId: this.conversationSelected().id,
            message: '',
            type: event.target.files[0]?.type?.includes('image')
              ? ChatMessageType.IMAGE
              : event.target.files[0]?.type?.includes('video')
                ? ChatMessageType.VIDEO
                : ChatMessageType.DOC,
            fileName: event.target.files[0].name,
          };
          for (let i = 0; i < event.target.files.length; i++) {
            files.push(event.target.files[i]);
          }
        }
        break;
      case ChatMessageType.IMAGE:
        break;
      case ChatMessageType.LOCATION:
        if (!this.geolocationCurrentPosition()) {
          // Location
          navigator.permissions
            .query({ name: 'geolocation' })
            .then((result) => {
              if (result?.state !== 'granted') {
                navigator.geolocation.getCurrentPosition(
                  (result) => {
                    this.geolocationCurrentPosition.set(result.coords);
                  },
                  (err) => {
                    this.geolocationCurrentPosition.set(null);
                  }
                );
              } else {
                navigator.geolocation.getCurrentPosition(
                  (result) => {
                    this.geolocationCurrentPosition.set(result.coords);
                  },
                  (err) => {
                    this.geolocationCurrentPosition.set(null);
                  }
                );
              }
            });
        }

        const _locationMessage = `https://www.google.com/maps/place/${this.geolocationCurrentPosition().longitude
          },${this.geolocationCurrentPosition().latitude}`;
        args = {
          conversationId: this.conversationSelected().id,
          message: _locationMessage,
          type: ChatMessageType.LOCATION,
          hasLink: true,
          urlHTML: urlModify(_locationMessage, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_locationMessage, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
          ),
        };
        break;
      case ChatMessageType.STICKER:
        break;
      case ChatMessageType.TEXT:
        if (sendNow) {
          args = {
            receiverId: this.conversationSelected().receiverId,
            conversationId: this.conversationSelected().id,
            message: element?.textContent ?? '',
            type: ChatMessageType.TEXT,
          };
          const _childNodes: any = element?.childNodes;
          if (_childNodes?.length) {
            let hasMention = false;
            let _message = '';
            for (const childNode of _childNodes) {
              switch (childNode.nodeType) {
                case Node.ELEMENT_NODE:
                  if (childNode.dataset?.id) {
                    _message += `[@${childNode.dataset?.id}]`;
                    hasMention = true;
                  } else
                    _message +=
                      childNode.nodeValue || childNode.outerHTML?.toString();
                  break;
                case Node.TEXT_NODE:
                  _message += childNode.nodeValue;
                  break;
              }
            }

            // format gửi tin nhắn
            args = {
              ...args,
              message: _message?.replace(/\u0000/g, ' ')?.replace('\u00A0', ' '),
              hasMention: hasMention,
              hasLink: urlVerify(_message),
              urlHTML: urlModify(_message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(_message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
              ),
            };
          }
        }
        break;
      case ChatMessageType.VIDEO:
        break;
      case ChatMessageType.VOICE_NOTE:
        break;
    }
    if (
      (args || this.messageFiles?.length) &&
      (sendNow)
    ) {
      if (this.sendMessageForm.value['replyMessage']) {
        args = {
          ...args,
          replyMessageId: this.sendMessageForm.value['replyMessage'].id,
        };
      }
      this.sendMessageForm.patchValue({
        text: null,
        replyMessage: null,
        image: null,
        file: null,
      });
      if (element) {
        // @ts-ignore
        element.innerHTML = '';
      }
      this.onResizeTextboxChat();
      // Text message
      const _localMessageId = uuid.v4();
      let _newMessage = {
        id: '',
        localMessageId: _localMessageId,
        type: args?.type,
        role: MessageRole.OWNER,
        user: {
          fullName: this.user?.fullname,
          avatar: 'assets/images/guest/avatar_default.svg',
        },
        createdAt: new Date(),
        message: args?.message,
        fileName: args?.fileName,
        hasMention: args?.hasMention,
        hasLink: args?.hasLink,
        urlHTML: args?.urlHTML,
        mentionHTML: args?.mentionHTML,
        innerHTML: args?.innerHTML,
        firstMessage: false,
        sending: true,
        replyMessage: this.sendMessageForm.value.replyMessage || null,
        previewLink: _.last(args?.message?.match(this.urlRegex)),
      };
      if (args?.hasMention) {
        const _messageMention = _newMessage.message.replace(
          this.mentionRegex,
          (match: any) => {
            const mentionUser = this.conversationSelected()?.members?.find(
              (item: any) => `[@${item.user.id}]` === match
            );
            return match !== '[@all]'
              ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
              `data-id="${mentionUser?.id}" data-fullname="${mentionUser?.fullname}">` +
              `@${mentionUser?.user?.fullname || ''}</span>`
              : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
              `data-id="all" data-fullname="Tất cả">` +
              `@All</span>`;
          }
        ).replace(/\r?\n/g, '<br>');
        _newMessage = {
          ..._newMessage,
          mentionHTML: urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
          ),
        };
      }
      // Media message
      const _localMediaMessageId = uuid.v4();
      if (this.messageFiles?.length) {
        _newMessageMedia = {
          id: '',
          localMessageId: _localMediaMessageId,
          type: ChatMessageType.IMAGE,
          role: MessageRole.OWNER,
          sender: this.user.officeUser,
          createdAt: new Date(),
          message: '',
          fileName: '',
          firstMessage: false,
          urls: this.messageFiles.map((item: any) => item.url),
          sending: true,
        };
      }
      const lastMessage: any = _.last(this.conversationSelected()?.messages);
      const _newMessages = _newMessageMedia
        ? _newMessage?.message?.length || _newMessage?.fileName
          ? [_newMessageMedia, _newMessage]
          : [_newMessageMedia]
        : _newMessage?.message?.length || _newMessage?.fileName
          ? [_newMessage]
          : [];
      // if (!this.conversationSelected()?.messages?.length)
      //   _newMessage.firstMessage = true
      if (lastMessage?.role && lastMessage?.role !== _newMessage?.role)
        _newMessage.firstMessage = true;
      if (
        compareAsc(
          startOfDay(new Date(lastMessage?.createdAt)),
          startOfDay(new Date())
        ) !== 0 ||
        !this.conversationSelected()?.messages?.length
      ) {
        _newMessage.firstMessage = true;
        const _newMessageDateGroup = {
          id: uuid.v4(),
          type: this.MessageViewType.DATE_GROUP,
          role: null,
          user: null,
          createdAt: new Date(),
          message: format(new Date(), 'dd/MM/yyyy'),
          firstMessage: false,
        };
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages: [
              ...currValue.messages,
              _newMessageDateGroup,
              ..._newMessages,
            ],
          })
        );
      } else {
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages: [...currValue.messages, ..._newMessages],
          })
        );
      }
      setTimeout(() => {
        const lastMessage = _.last<any>(this.conversationSelected()?.messages);
        const messElement = document.getElementById(`parent_${lastMessage.id}`);
        document
          .getElementById(
            this.commonService.smallScreen()
              ? 'mobile_messageDiv'
              : 'messageDiv'
          )
          ?.scrollTo({
            behavior: 'instant',
            top: messElement?.offsetTop,
          });
      });

      // Update arguments
      switch (args.type) {
        case ChatMessageType.TEXT:
        case ChatMessageType.LOCATION:
          if (this.messageFiles?.length) {
            const _files = this.messageFiles.map((item: any) => {
              return {
                fileName: item.fileName,
                fileType: item.mimetype,
              };
            });
            this.commonService.setRemoveShowGlobalLoading(true);
            uploadLinkResponses = await Promise.all([
              this.uploadFileService.storageGeneratePresignedUrls({
                files: _files,
              }),
            ]);
            if (uploadLinkResponses?.length) {
              argsMedia = {
                ...argsMedia,
                urls: _.head<any>(uploadLinkResponses)?.data?.map(
                  (item: any) => item.url
                ),
              };
            }
          }
          // if (args.hasMention || args.hasLink) {
          delete args.hasMention;
          delete args.hasLink;
          delete args.innerHTML;
          delete args.mentionHTML;
          delete args.urlHTML;
          // }
          break;
        case ChatMessageType.DOC:
        case ChatMessageType.VIDEO:
        case ChatMessageType.IMAGE:
          this.commonService.setRemoveShowGlobalLoading(true);
          uploadLinkResponses = await Promise.all([
            this.uploadFileService.storageGeneratePresignedUrls({
              files: [
                {
                  fileName: files[0].name,
                  fileType: files[0].type,
                },
              ],
            }),
          ]);
          if (uploadLinkResponses?.length) {
            args = {
              ...args,
              urls: [_.head<any>(uploadLinkResponses)?.data?.[0]?.url],
            };
          }
          break;
      }

      // Sent request to server
      this.commonService.setRemoveShowGlobalLoading(true);
      if (this.messageFiles?.length) {
        this.commonService.setRemoveShowGlobalLoading(true);
        this.commonService.setIncludeHttpHeader(false);
        forkJoin(
          this.messageFiles.map((item: any, index: number) => {
            return this.uploadFileService.uploadMessageFileS3Observable(
              item.file,
              _.head<any>(uploadLinkResponses)?.data?.[index]?.presignedUrl,
              item.localMessageId
            );
          })
        ).subscribe({
          next: async (result: any) => {
            this.commonService.setRemoveShowGlobalLoading(true);
            const responseMediaMessage = await this.guestService.chatMessageAdd(
              argsMedia,
              _localMediaMessageId
            );
            this.onUpdateConversationId(responseMediaMessage.conversationId);
            this.onUpdateStatusMessageSent(
              responseMediaMessage.localMessageId,
              responseMediaMessage
            );
          },
          error: (err: any) => { },
        });
        this.messageFiles = [];
      }
      switch (args.type) {
        case ChatMessageType.TEXT:
        case ChatMessageType.LOCATION:
          if (args?.message?.length || args?.fileName) {
            this.commonService.setRemoveShowGlobalLoading(true);
            const responseTextMessage = await this.guestService.chatMessageAdd(
              args,
              _localMessageId
            );
            this.onUpdateConversationId(responseTextMessage.conversationId);
            this.onUpdateStatusMessageSent(
              responseTextMessage?.localMessageId,
              responseTextMessage
            );
          }
          break;
        case ChatMessageType.DOC:
        case ChatMessageType.VIDEO:
        case ChatMessageType.IMAGE:
          this.commonService.setRemoveShowGlobalLoading(true);
          this.commonService.setIncludeHttpHeader(false);
          this.uploadFileService
            .uploadMessageFileS3Observable(
              files[0],
              _.head<any>(uploadLinkResponses)?.data?.[0]?.presignedUrl,
              _localMessageId
            )
            .subscribe(
              async (result: any) => {
                this.commonService.setRemoveShowGlobalLoading(true);
                const responseFileMessage =
                  await this.guestService.chatMessageAdd(args, _localMessageId);
                this.onUpdateConversationId(responseFileMessage.conversationId);
                this.onUpdateStatusMessageSent(
                  _localMessageId,
                  responseFileMessage
                );
              },
              (err: any) => { }
            );
          this.sendMessageForm.controls['file'].reset();
          break;
      }
      // }
    }
  }

  async onSendMessage(
    event?: any,
    type: ChatMessageType = ChatMessageType.TEXT,
    sendNow = false
  ) {
    event?.stopPropagation();
    this.onResizeTextboxChat();
    const element = document.getElementById(
      this.commonService.smallScreen()
        ? 'mobile-contenteditable-input-text-message'
        : 'contenteditable-input-text-message'
    );
    this.sendMessageForm.patchValue({
      text: `${element?.textContent}${event?.key?.length === 1 ? event?.key : ''
        }`,
    });
    // if (event.key === 'Enter' && !event.shiftKey && !this.sendMessageForm.value?.text?.trim()?.length && !this.messageFiles?.length) {
    //   //   // @ts-ignore
    //   //   document.querySelector('[contenteditable]').innerHTML = ''
    //   this.sendMessageForm.controls['text'].reset()
    //   this.onResizeTextboxChat()
    //   return
    // }
    // // Mention
    if (this.onMentionMember(event, element)) return;
    // Send message

    const files: any = [];
    let args: any = null;
    let argsMedia: any = null;
    let _newMessageMedia: any = null;
    let uploadLinkResponses: any = [];
    switch (type) {
      case ChatMessageType.AUDIO:
        break;
      case ChatMessageType.CALL:
        break;
      case ChatMessageType.DOC:
        if (event.target.files?.length || event.dataTransfer?.files?.length) {
          const _files = event.target.files || event.dataTransfer?.files;
          args = {
            receiverId: this.conversationSelected().receiverId,
            conversationId: this.conversationSelected().id,
            message: '',
            type: _files[0]?.type?.includes('image')
              ? ChatMessageType.IMAGE
              : _files[0]?.type?.includes('video')
                ? ChatMessageType.VIDEO
                : ChatMessageType.DOC,
            fileName: _files[0].name,
          };
          for (let i = 0; i < _files.length; i++) {
            files.push(_files[i]);
          }
        }
        break;
      case ChatMessageType.IMAGE:
        break;
      case ChatMessageType.LOCATION:
        if (!this.geolocationCurrentPosition()) {
          // Location
          navigator.permissions
            .query({ name: 'geolocation' })
            .then((result) => {
              if (result?.state !== 'granted') {
                navigator.geolocation.getCurrentPosition(
                  (result) => {
                    this.geolocationCurrentPosition.set(result.coords);
                  },
                  (err) => {
                    this.geolocationCurrentPosition.set(null);
                  }
                );
              } else {
                navigator.geolocation.getCurrentPosition(
                  (result) => {
                    this.geolocationCurrentPosition.set(result.coords);
                  },
                  (err) => {
                    this.geolocationCurrentPosition.set(null);
                  }
                );
              }
            });
        }

        const _locationMessage = `https://www.google.com/maps/place/${this.geolocationCurrentPosition().longitude
          },${this.geolocationCurrentPosition().latitude}`;
        args = {
          conversationId: this.conversationSelected().id,
          message: _locationMessage,
          type: ChatMessageType.LOCATION,
          hasLink: true,
          urlHTML: urlModify(_locationMessage, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_locationMessage, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
          ),
        };
        break;
      case ChatMessageType.STICKER:
        break;
      case ChatMessageType.TEXT:
        if ((event.key === 'Enter' && !event.shiftKey) || sendNow) {
          event.preventDefault();
          args = {
            receiverId: this.conversationSelected().receiverId,
            conversationId: this.conversationSelected().id,
            message: element?.textContent ?? '',
            type: ChatMessageType.TEXT,
          };
          if (this.messageFiles?.length) {
            argsMedia = {
              receiverId: this.conversationSelected().receiverId,
              conversationId: this.conversationSelected().id,
              message: '',
              type: ChatMessageType.IMAGE,
              urls: [],
            };
          }
          const _childNodes: any = element?.childNodes;
          if (_childNodes?.length) {
            let hasMention = false;
            let _message = '';
            for (const childNode of _childNodes) {
              switch (childNode.nodeType) {
                case Node.ELEMENT_NODE:
                  if (childNode.dataset?.id) {
                    _message += `[@${childNode.dataset?.id}]`;
                    hasMention = true;
                  } else
                    _message +=
                      childNode.nodeValue || childNode.outerHTML?.toString();
                  break;
                case Node.TEXT_NODE:
                  _message += childNode.nodeValue;
                  break;
              }
            }

            // format gửi tin nhắn
            args = {
              ...args,
              message: _message?.replace(/\u0000/g, ' ')?.replace('\u00A0', ' ').replace(/\r?\n/g, '<br>'),
              hasMention: hasMention,
              hasLink: urlVerify(_message),
              urlHTML: urlModify(_message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(_message, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
              ),
            };
          }
        }
        break;
      case ChatMessageType.VIDEO:
        break;
      case ChatMessageType.VOICE_NOTE:
        break;
    }
    if (
      (args || this.messageFiles?.length) &&
      ((event.key === 'Enter' && !event.shiftKey) || sendNow)
    ) {
      event.preventDefault();
      if (this.sendMessageForm.value['replyMessage']) {
        args = {
          ...args,
          replyMessageId: this.sendMessageForm.value['replyMessage'].id,
        };
      }
      this.sendMessageForm.patchValue({
        text: null,
        replyMessage: null,
        image: null,
        file: null,
      });
      if (element) {
        // @ts-ignore
        element.innerHTML = '';
      }
      this.onResizeTextboxChat();
      // Text message
      const _localMessageId = uuid.v4();
      let _newMessage = {
        id: '',
        localMessageId: _localMessageId,
        type: args?.type,
        role: MessageRole.OWNER,
        user: {
          fullName: this.user?.fullname,
          avatar: 'assets/images/guest/avatar_default.svg',
        },
        createdAt: new Date(),
        message: args?.message?.replace(/\r?\n/g, '<br>'),
        fileName: args?.fileName,
        hasMention: args?.hasMention,
        hasLink: args?.hasLink,
        urlHTML: args?.urlHTML,
        mentionHTML: args?.mentionHTML,
        innerHTML: args?.innerHTML,
        firstMessage: false,
        sending: true,
        replyMessage: this.sendMessageForm.value.replyMessage || null,
        previewLink: _.last(args?.message?.match(this.urlRegex)),
      };
      if (args?.hasMention) {
        // const _message = _newMessage.message.replace(/\r?\n/g, '<br>');
        const _messageMention = _newMessage.message.replace(
          this.mentionRegex,
          (match: any) => {
            const mentionUser = this.conversationSelected()?.members?.find(
              (item: any) => `[@${item.user.id}]` === match
            );
            return match !== '[@all]'
              ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
              `data-id="${mentionUser?.id}" data-fullname="${mentionUser?.fullname}">` +
              `@${mentionUser?.user?.fullname || ''}</span>`
              : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
              `data-id="all" data-fullname="Tất cả">` +
              `@All</span>`;
          }
        ).replace(/\r?\n/g, '<br>');
        _newMessage = {
          ..._newMessage,
          mentionHTML: urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>'),
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_messageMention, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
          ),
        };
      }
      // Media message
      const _localMediaMessageId = uuid.v4();
      if (this.messageFiles?.length) {
        _newMessageMedia = {
          id: '',
          localMessageId: _localMediaMessageId,
          type: ChatMessageType.IMAGE,
          role: MessageRole.OWNER,
          sender: this.user.officeUser,
          createdAt: new Date(),
          message: '',
          fileName: '',
          firstMessage: false,
          urls: this.messageFiles.map((item: any) => item.url),
          sending: true,
        };
      }
      const lastMessage: any = _.last(this.conversationSelected()?.messages);
      const _newMessages = _newMessageMedia
        ? _newMessage?.message?.length || _newMessage?.fileName
          ? [_newMessageMedia, _newMessage]
          : [_newMessageMedia]
        : _newMessage?.message?.length || _newMessage?.fileName
          ? [_newMessage]
          : [];
      // if (!this.conversationSelected()?.messages?.length)
      //   _newMessage.firstMessage = true
      if (lastMessage?.role && lastMessage?.role !== _newMessage?.role)
        _newMessage.firstMessage = true;
      if (
        compareAsc(
          startOfDay(new Date(lastMessage?.createdAt)),
          startOfDay(new Date())
        ) !== 0 ||
        !this.conversationSelected()?.messages?.length
      ) {
        _newMessage.firstMessage = true;
        const _newMessageDateGroup = {
          id: uuid.v4(),
          type: this.MessageViewType.DATE_GROUP,
          role: null,
          user: null,
          createdAt: new Date(),
          message: format(new Date(), 'dd/MM/yyyy'),
          firstMessage: false,
        };
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages: [
              ...currValue.messages,
              _newMessageDateGroup,
              ..._newMessages,
            ],
          })
        );
      } else {
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages: [...currValue.messages, ..._newMessages],
          })
        );
      }
      setTimeout(() => {
        const lastMessage = _.last<any>(this.conversationSelected()?.messages);
        const messElement = document.getElementById(`parent_${lastMessage.id}`);
        document
          .getElementById(
            this.commonService.smallScreen()
              ? 'mobile_messageDiv'
              : 'messageDiv'
          )
          ?.scrollTo({
            behavior: 'instant',
            top: messElement?.offsetTop,
          });
      });

      // Update arguments
      switch (args.type) {
        case ChatMessageType.TEXT:
        case ChatMessageType.LOCATION:
          if (this.messageFiles?.length) {
            const _files = this.messageFiles.map((item: any) => {
              return {
                fileName: item.fileName,
                fileType: item.mimetype,
              };
            });
            this.commonService.setRemoveShowGlobalLoading(true);
            uploadLinkResponses = await Promise.all([
              this.uploadFileService.storageGeneratePresignedUrls({
                files: _files,
              }),
            ]);
            if (uploadLinkResponses?.length) {
              argsMedia = {
                ...argsMedia,
                urls: _.head<any>(uploadLinkResponses)?.data?.map(
                  (item: any) => item.url
                ),
              };
            }
          }
          // if (args.hasMention || args.hasLink) {
          delete args.hasMention;
          delete args.hasLink;
          delete args.innerHTML;
          delete args.mentionHTML;
          delete args.urlHTML;
          // }
          break;
        case ChatMessageType.DOC:
        case ChatMessageType.VIDEO:
        case ChatMessageType.IMAGE:
          this.commonService.setRemoveShowGlobalLoading(true);
          uploadLinkResponses = await Promise.all([
            this.uploadFileService.storageGeneratePresignedUrls({
              files: [
                {
                  fileName: files[0].name,
                  fileType: files[0].type,
                },
              ],
            }),
          ]);
          if (uploadLinkResponses?.length) {
            args = {
              ...args,
              urls: [_.head<any>(uploadLinkResponses)?.data?.[0]?.url],
            };
          }
          break;
      }

      // Sent request to server
      this.commonService.setRemoveShowGlobalLoading(true);
      if (this.messageFiles?.length) {
        this.commonService.setRemoveShowGlobalLoading(true);
        this.commonService.setIncludeHttpHeader(false);
        forkJoin(
          this.messageFiles.map((item: any, index: number) => {
            return this.uploadFileService.uploadMessageFileS3Observable(
              item.file,
              _.head<any>(uploadLinkResponses)?.data?.[index]?.presignedUrl,
              item.localMessageId
            );
          })
        ).subscribe({
          next: async (result: any) => {
            this.commonService.setRemoveShowGlobalLoading(true);
            const responseMediaMessage = await this.guestService.chatMessageAdd(
              argsMedia,
              _localMediaMessageId
            );
            this.onUpdateConversationId(responseMediaMessage.conversationId);
            this.onUpdateStatusMessageSent(
              responseMediaMessage.localMessageId,
              responseMediaMessage
            );
          },
          error: (err: any) => { },
        });
        this.messageFiles = [];
      }
      switch (args.type) {
        case ChatMessageType.TEXT:
        case ChatMessageType.LOCATION:
          if (args?.message?.length || args?.fileName) {
            this.commonService.setRemoveShowGlobalLoading(true);
            const responseTextMessage = await this.guestService.chatMessageAdd(
              args,
              _localMessageId
            );
            this.onUpdateConversationId(responseTextMessage.conversationId);
            this.onUpdateStatusMessageSent(
              responseTextMessage?.localMessageId,
              responseTextMessage
            );
          }
          break;
        case ChatMessageType.DOC:
        case ChatMessageType.VIDEO:
        case ChatMessageType.IMAGE:
          this.commonService.setRemoveShowGlobalLoading(true);
          this.commonService.setIncludeHttpHeader(false);
          this.uploadFileService
            .uploadMessageFileS3Observable(
              files[0],
              _.head<any>(uploadLinkResponses)?.data?.[0]?.presignedUrl,
              _localMessageId
            )
            .subscribe(
              async (result: any) => {
                this.commonService.setRemoveShowGlobalLoading(true);
                const responseFileMessage =
                  await this.guestService.chatMessageAdd(args, _localMessageId);
                this.onUpdateConversationId(responseFileMessage.conversationId);
                this.onUpdateStatusMessageSent(
                  _localMessageId,
                  responseFileMessage
                );
              },
              (err: any) => { }
            );
          this.sendMessageForm.controls['file'].reset();
          break;
      }
      // }
    }
  }

  onUpdateConversationId(conversationId: string) {
    if (this.conversationSelected().id === this.conversationSelected().tempId) {
      const _conversations = _.cloneDeep(this.conversations());
      const _conversationIndex = _conversations?.findIndex(
        (item: any) => item.id === this.conversationSelected().id
      );
      _conversations[_conversationIndex] = {
        ..._conversations[_conversationIndex],
        id: conversationId,
        tempId: null,
      };
      this.conversationSelected.update((value) =>
        Object.assign({}, value, {
          id: conversationId,
          tempId: null,
        })
      );
      this.conversations.update((value) => [..._conversations]);
      this.websocketService.emit('conversation:joined', {
        conversationId: conversationId,
      });
    }
  }

  onUpdateStatusMessageSent(localMessageId: string, response: any) {
    if (!response || !localMessageId?.length) return;
    const _messages = _.cloneDeep(this.conversationSelected().messages);
    const _messageIndex = _messages?.findIndex(
      (mess: any) => mess.localMessageId === localMessageId
    );
    _messages[_messageIndex] = {
      ..._messages[_messageIndex],
      ...response,
      sending: false,
    };
    if (response?.replyMessage) {
      const _messageMention = response?.replyMessage?.message?.replace(
        this.mentionRegex,
        (match: any) => {
          const mentionUser = response?.replyMessage?.mentionTo?.find(
            (item: any) => `[@${item.id}]` === match
          );
          return match !== '[@all]'
            ? `@${mentionUser?.fullname || ''}`
            : `@All`;
        }
      );
      _messages[_messageIndex] = {
        ..._messages[_messageIndex],
        replyMessage: {
          ..._messages[_messageIndex].replyMessage,
          message: _messageMention,
        },
      };
    }
    if (_messages[_messageIndex]?.hasLink) {
      if (
        _messages[_messageIndex]?.type === ChatMessageType.TEXT &&
        _messages[_messageIndex]?.message?.match(this.urlRegex)?.length
      ) {
        _messages[_messageIndex] = {
          ..._messages[_messageIndex],
          previewLink: _.last(
            _messages[_messageIndex]?.message?.match(this.urlRegex)
          ),
        };
      }
    }
    this.conversationSelected.update((currValue) =>
      Object.assign({}, currValue, {
        messages: _messages,
      })
    );
    const _conversations = _.cloneDeep(this.conversations());
    const _conversationIndex = _conversations?.findIndex(
      (item: any) => item.id === response.conversationId
    );
    // const _messageMention = response?.message?.replace(this.mentionRegex, (match: any) => {
    //   const mentionUser = response?.mentionTo?.find((item: any) => `[@${item.id}]` === match)
    //   return `@${mentionUser?.fullname || ''}`
    // })
    let lastMessage = '';
    switch (response?.type) {
      case ChatMessageType.TEXT:
      case ChatMessageType.LOCATION:
        lastMessage =
          response?.message?.replace(this.mentionRegex, (match: any) => {
            const mentionUser = response?.mentionTo?.find(
              (item: any) => `[@${item.id}]` === match
            );
            return match !== '[@all]'
              ? `@${mentionUser?.fullname || ''}`
              : `@All`;
          }) || '';
        break;
      case ChatMessageType.DOC:
        lastMessage = `[File]${response?.fileName}`;
        break;
      case ChatMessageType.IMAGE:
        lastMessage = `[Image]`;
        break;
      case ChatMessageType.VIDEO:
        lastMessage = `[Video]`;
        break;
    }
    _conversations[_conversationIndex] = {
      ..._conversations[_conversationIndex],
      lastMessage: {
        ..._conversations[_conversationIndex].lastMessage,
        id: response.id,
        message: lastMessage,
        mentionTo: response.mentionTo,
      },
      lastMessageAt: response.createdAt,
    };
    this.conversations.update(() => [..._conversations]);
  }

  // Mention cho web và mentiontoken trên mobile
  onMentionMember(event: any, element: any = null, isEdit: boolean = false): boolean {
    const editElement = isEdit
    ? document.getElementById(`${this.editMessageSelected().id}_editMessage`)
    : document.querySelector('[contenteditable]') as HTMLElement;
    if (event?.key === '@' || (typeof event === 'string' && event?.includes('@') && event?.trim().length === 1)) {
      const _mentionMembers = [
        {
          user: {
            id: 'all',
            fullname: 'All',
          },
        },
        ...(this.conversationSelected()?.members || []),
      ]
      this.activeSuggestionIndex = 0;
      if (isEdit){
        this.editMessageMentionMembers.set(_mentionMembers);
        this.autocompleteEditMessageTrigger?.openPanel();
      }else{
          this.mentionMembers.set(_mentionMembers);
          this.autocompleteTrigger.openPanel();
      }
      return true;
    }
    switch (event?.code) {
      case 'Escape':
        this.autocompleteTrigger.closePanel();
        this.autocompleteEditMessageTrigger?.closePanel();
        break;
      case 'Backspace':
        // Loại bỏ span rỗng
        removeEmptySpan(this.conversationSelected()?.members || []);
        break;
      case 'Space':
        requestAnimationFrame(() => {
          const info = logCaretPosition(editElement);
          const fullname = info?.span?.getAttribute('data-fullname')
          if (fullname?.length && ((info?.offset ?? 0) >= (fullname?.length ?? 0)) ||
                (info?.absPos ?? 0) > (fullname?.length ?? 0)) {
            const parent = info?.span?.parentNode;
            if (parent) {
              const t = document.createTextNode('\u200B');
              parent.insertBefore(t, null);
              const r = document.createRange();
              r.setStart(t, Math.max(0, Math.min(t.length ?? 0, t.data.length)));
              r.collapse(true);
              const sel = window.getSelection();
              sel?.removeAllRanges();
              sel?.addRange(r);
              parent.normalize();
            }
          }
        })
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        requestAnimationFrame(() => {
          const info = logCaretPosition(editElement);
          const fullname = info?.span?.getAttribute('data-fullname')
          if (fullname?.length && ((info?.offset ?? 0) >= (fullname?.length ?? 0)) ||
                (info?.absPos ?? 0) > (fullname?.length ?? 0)) {
            const parent = info?.span?.parentNode;
            if (parent) {
              const t = document.createTextNode('\u200B');
              parent.insertBefore(t, null);
              const r = document.createRange();
              r.setStart(t, Math.max(0, Math.min(t.length ?? 0, t.data.length)));
              r.collapse(true);
              const sel = window.getSelection();
              sel?.removeAllRanges();
              sel?.addRange(r);
              parent.normalize();
            }
          }
        })
        break;
    }

    this.sendMessageTextChangeBehavior.next(element?.textContent || '');

    if (this.autocompleteTrigger?.panelOpen || this.autocompleteEditMessageTrigger?.panelOpen) {
      switch (event?.key) {
        // case 'Space':
        case 'Escape':
          this.autocompleteTrigger.closePanel();
          this.autocompleteEditMessageTrigger?.closePanel();
          return true;
        case 'ArrowDown':
          event.preventDefault();
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex + 1) % (isEdit ? this.editMessageMentionMembers().length : this.mentionMembers().length);
          this.scrollActiveIntoView();
          return true;
        case 'ArrowUp':
          event.preventDefault();
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex - 1 + (isEdit ? this.editMessageMentionMembers().length : this.mentionMembers().length)) %
            (isEdit ? this.editMessageMentionMembers().length : this.mentionMembers().length);
          this.scrollActiveIntoView();
          return true;
        case 'Enter':
          // const _editor = document.querySelector('[contenteditable]');
          const _mention = this.getMentionAfterAt(editElement);
          this.onReRenderMessage(_mention?.length, null, isEdit);
          this.autocompleteTrigger.closePanel();
          this.autocompleteEditMessageTrigger?.closePanel();
          event.preventDefault();
          return true;
        default:
          break;
      }
    }
    let mention = '';
    if (typeof event !== 'string' && event?.key) {
      // const editor = document.querySelector('[contenteditable]');
      mention = this.getMentionAfterAt(editElement);
      if (new RegExp('^[A-Za-z0-9]+$').test(event.key)) {
        mention = `${mention}${event.key}`;
      }
      if (event.key === 'Backspace') {
        mention = mention.slice(0, mention.length - 'Backspace'.length);
      }
    } else {
      // Mention mobile
      mention = event;
    }
    if (mention?.length > 1 && mention.startsWith('@')) {
      const _mentionMembers =
        this.conversationSelected()?.members?.filter((item: any) =>
          `${item?.user?.fullname?.toLowerCase()}`.includes(_.cloneDeep(mention)?.replace('@', '')?.toLowerCase()) ||
          removeVietnameseTones(`${item?.user?.fullname?.toLowerCase()}`).includes(removeVietnameseTones(_.cloneDeep(mention)?.replace('@', '')?.toLowerCase()))
        ) || [];
      if (isEdit)
        this.editMessageMentionMembers.set(_mentionMembers);
      else
        this.mentionMembers.set(_mentionMembers);
    } else if (mention?.length === 1 && mention.startsWith('@')) {
      const _mentionMembers = [
        {
          user: {
            id: 'all',
            fullname: 'All',
          },
        },
        ...(this.conversationSelected()?.members || []),
      ];
      if (isEdit)
        this.editMessageMentionMembers.set(_mentionMembers);
      else
        this.mentionMembers.set(_mentionMembers);
    } else {
      this.mentionMembers.set([])
      this.editMessageMentionMembers.set([])
    }
    if ((!this.mentionMembers()?.length && !isEdit) 
      || (!this.editMessageMentionMembers()?.length && isEdit) 
      || !mention?.length 
      || !element?.textContent?.trim().length) {
      this.autocompleteTrigger.closePanel();
      this.autocompleteEditMessageTrigger?.closePanel();
    } else {
      if (!this.autocompleteTrigger.panelOpen && mention.startsWith('@')){
        this.activeSuggestionIndex = 0;
        if (isEdit)
          this.autocompleteEditMessageTrigger?.openPanel();
        else
          this.autocompleteTrigger.openPanel();
      }
    }
    return false;
  }

  onSelectMention(event: any) {
    this.activeSuggestionIndex = this.mentionMembers()?.findIndex(
      (item: any) => item?.user?.id === event.option.value
    );
    const selection = window.getSelection();
    const matchedMentionFilter =
      _.last(
        selection?.focusNode?.textContent
          ?.slice(0, selection?.focusOffset)
          ?.match(/@([^@\s]+)$/g)
      ) ||
      _.last(
        selection?.focusNode?.textContent
          ?.slice(0, selection?.focusOffset)
          ?.match(/@$/g)
      );
    this.onReRenderMessage(matchedMentionFilter?.length);
    insertSpaceEscapingElementAtCaret('\u00A0');
  }

  onReRenderMessage(lengthRegex: number = 0, deleteMention: any = null, isEdit: boolean = false) {
    const _mentionMembers = isEdit ? this.editMessageMentionMembers() : this.mentionMembers();
    if (!deleteMention) {
      const anchor = document.createElement('span');
      anchor.textContent = `@${_mentionMembers[this.activeSuggestionIndex].user?.fullname
        }`;
      anchor.dataset['id'] =
        _mentionMembers[this.activeSuggestionIndex].user?.id;
      anchor.dataset['fullname'] =
        _mentionMembers[this.activeSuggestionIndex].user?.fullname;
      anchor.className =
        'mention no-underline text-blue-300-chat owner-color cursor-pointer';

      const selection_mention = window.getSelection();
      const range_mention = selection_mention?.getRangeAt(0);
      range_mention?.setStart(
        selection_mention?.focusNode as Node,
        (selection_mention?.focusOffset as number) - lengthRegex
      );
      range_mention?.setEnd(
        selection_mention?.focusNode as Node,
        selection_mention?.focusOffset as number
      );
      range_mention?.deleteContents();
      range_mention?.insertNode(anchor);
      range_mention?.setStartAfter(anchor);
      range_mention?.setEndAfter(anchor);
      selection_mention?.removeAllRanges();
      selection_mention?.addRange(range_mention as Range);
    }
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    range?.setStart(
      selection?.focusNode as Node,
      selection?.focusOffset as number
    );
    range?.setEnd(
      selection?.focusNode as Node,
      selection?.focusOffset as number
    );
    range?.deleteContents();
    range?.collapse(false);
    let textElement;
    if (selection?.focusNode?.nodeType === Node.ELEMENT_NODE)
      textElement = document.createTextNode('\u00A0');
    else textElement = document.createTextNode('\u200B');
    range?.insertNode(textElement);
    range?.setEndAfter(textElement);
    range?.setStartAfter(textElement);
    selection?.removeAllRanges();
    selection?.addRange(range as Range);

    // Loại bỏ span rỗng
    const spans2 = Array.from(document.querySelector('[contenteditable]')?.querySelectorAll('span') || []);
    for (const sp of spans2) {
      if (sp.childElementCount === 0 && sp.textContent?.trim().length === 0) {
        sp.remove();
      }
    }
    unwrapFontTags(document.querySelector('[contenteditable]') as HTMLElement);
  }

  onResizeTextboxChat() {
    const elemP: any = document
      .getElementById(
        this.commonService.smallScreen()
          ? 'mobile-input-text-message'
          : 'input-text-message'
      )
      ?.querySelector('div');

    const elemBrs: any = elemP?.querySelectorAll('br') || [];
    const elemImages: any = elemP?.querySelectorAll('img') || [];
    const textWidth = this.myCanvasContext.measureText(
      elemP.innerText?.trim()
    ).width;
    if (
      (textWidth &&
        elemP &&
        (textWidth > this.widthCompare || elemBrs?.length)) ||
      elemImages?.length
    ) {
      this.conversationSelected.update((value) =>
        Object.assign({}, value, { multipleLineTextbox: true })
      );
      this.cdr.detectChanges();
    } else {
      this.conversationSelected.update((value) =>
        Object.assign({}, value, { multipleLineTextbox: false })
      );
      if (!elemP.innerText?.trim()?.length) {
        // @ts-ignore
        document.querySelector('[contenteditable]').innerHTML = '';
      }
      this.cdr.detectChanges();
    }
  }

  onShowMessageAction(item: any) {
    if (item.type === MessageViewType.DATE_GROUP || item.type === ChatMessageType.LOG) return;
    this.messageHover.update(() => item);
    if (item?.isEdit) return;
    if (this.messageActionOverlayRef) {
      const _origin = (
        this.messageActionOverlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy
      )._origin;
      const _originReaction = (
        this.messageReActionOverlayRef?.getConfig()
          ?.positionStrategy as FlexibleConnectedPositionStrategy
      )?._origin;
      if (
        (_origin as HTMLElement)?.id !== (_originReaction as HTMLElement)?.id
      ) {
        this.messageReActionOverlayRef?.detach();
        this.messageReActionOverlayRef = null!;
      }
      if ((_origin as HTMLElement)?.id !== `${item.type}_${item.id}`) {
        this.onCloseMessageAction(item);
      } else return;
    }
    let message = '';
    switch (item.type) {
      case ChatMessageType.TEXT:
        message = item.message;
        break;
      case ChatMessageType.DOC:
        message = item.fileName;
        break;
    }
    if (
      !message?.length &&
      [ChatMessageType.TEXT, ChatMessageType.DOC].includes(item.type)
    )
      return;
    // const messageElement = document.getElementById(`${item.type}_${item.id}`);
    // const messageDivElement = document.getElementById(
    //   this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv'
    // );
    // const textWidth = this.myCanvasContext.measureText(message).width;
    const position: any = this.commonService.smallScreen()
      ? [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 4,
        }
      ]
      : item.role === MessageRole.OWNER ? [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ] : [
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      ]
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(
        this.elementRef.nativeElement.querySelector(`#${item.type}_${item.id}`)
      )
      .withPositions(position)
      .withViewportMargin(8)
      .withFlexibleDimensions(true)
      .withPush(false);

    this.messageActionOverlayRef = this.overlay.create({
      hasBackdrop: this.commonService.smallScreen(),
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'msg-overlay-pane'
    });
    const portal = new TemplatePortal(
      this.messageActionTemplate,
      this.viewContainerRef,
      { item: item }
    );
    this.messageActionOverlayRef.attach(portal);
    if (!this.commonService.smallScreen()) {
      this.messageActionOverlayRefOutsidePointerEvents =
        this.messageActionOverlayRef.outsidePointerEvents().subscribe((value) => {
          setTimeout(() => {
            this.onCloseMessageAction(item);
          });
          this.messageActionOverlayRefOutsidePointerEvents.unsubscribe();
        });
    } else {
      this.messageActionOverlayRefOutsidePointerEvents =
        this.messageActionOverlayRef.backdropClick().subscribe((value) => {
          setTimeout(() => {
            this.onCloseMessageAction(item);
          });
          this.messageActionOverlayRefOutsidePointerEvents.unsubscribe();
        });
    }
  }

  onCloseMessageAction(item: any) {
    if (this.messageActionOverlayRef) {
      const pane = this.messageActionOverlayRef.overlayElement;
      pane.classList.add('closing');
      this.messageActionOverlayRef.dispose();
      this.messageActionOverlayRef = null!;
    }
    if (this.messageReActionOverlayRef) {
      this.messageReActionOverlayRef.dispose();
      this.messageReActionOverlayRef = null!;
    }
    if (this.messageSendEmojiOverlayRef) {
      this.messageSendEmojiOverlayRef.dispose();
      this.messageSendEmojiOverlayRef = null!;
    }
    this.overlayTemplates.forEach((ref: any) => {
      ref.dispose();
    });
    this.overlayTemplates = [];
    // const overlayContainerElement = this.overlayContainer.getContainerElement();
    // overlayContainerElement.style.display = 'none';
  }

  onShowMessageReAction(event: any) {
    clearTimeout(this.messageReactionTimeout);
    this.messageReActionOverlayRef?.dispose();
    this.messageReActionOverlayRef = null!;
    if (this.messageActionOverlayRef) {
      const _origin = (
        this.messageActionOverlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy
      )._origin;
      const messageHoverIdIndex = (_origin as HTMLElement).id.indexOf('_');
      const messageHoverId = (_origin as HTMLElement).id.substring(
        messageHoverIdIndex + 1
      );
      const messageHover = this.conversationSelected()?.messages?.find(
        (item: any) => item.id === messageHoverId
      );
      this.messageReaction.set(messageHover);
      this.messageReactionTimeout = setTimeout(() => {
        const isSmallScreen = this.commonService.smallScreen();
        const messageElement = document.getElementById(
          `${messageHover.type}_${messageHover.id}`
        );
        const messageOffsetTop = messageElement?.offsetTop || 0;
        const isHighOnScreen = messageOffsetTop > 300;

        // Xác định vị trí hiển thị dựa trên vai trò
        const isOwner = messageHover.role === MessageRole.OWNER;
        const basePosition = {
          originX: isOwner ? 'start' : 'end',
          overlayX: isOwner ? 'end' : 'start',
          offsetX: isOwner ? -10 : 10,
        };

        // Khai báo `position`
        let position: any[];

        if (isSmallScreen || isHighOnScreen) {
          // Nếu màn hình nhỏ hoặc tin nhắn ở cao, tooltip xuất hiện ở trên tin nhắn
          position = [
            {
              ...basePosition,
              originY: 'center',
              overlayY: 'bottom',
              offsetY: 0,
              originX: 'start',
            },
          ];
        } else {
          // Nếu tin nhắn ở giữa hoặc thấp, tooltip hiển thị giữa tin nhắn
          position = [
            {
              ...basePosition,
              originY: 'center',
              overlayY: 'center',
            },
          ];
        }
        const positionStrategy = this.overlay
          .position()
          .flexibleConnectedTo(
            this.elementRef.nativeElement.querySelector(
              `#${messageHover.type}_${messageHover.id}`
            )
          )
          .withPositions(position)
          .withViewportMargin(8)
          .withFlexibleDimensions(true)
          .withPush(false);

        this.messageReActionOverlayRef = this.overlay.create({
          hasBackdrop: false,
          backdropClass: '',
          positionStrategy,
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.overlayTemplates.push(this.messageReActionOverlayRef);
        const portal = new TemplatePortal(
          this.messageReActionTemplate,
          this.viewContainerRef
        );
        this.messageReActionOverlayRef.attach(portal);
      }, 1200);
    } else {
      return;
    }
    // this.messageActionOverlayRefOutsidePointerEvents = this.messageReActionOverlayRef.outsidePointerEvents().subscribe((value) => {
    //   this.onCloseMessageAction(item)
    //   this.messageActionOverlayRefOutsidePointerEvents.unsubscribe()
    // })
  }

  onLeaveReAction(event: any) {
    if (this.messageReActionOverlayRef) return;
    else clearTimeout(this.messageReactionTimeout);
  }

  async onReactionMessage(emoji: any, isInput: boolean = false) {
    if (this.messageSendEmojiOverlayRef) {
      document
        .getElementById(
          this.commonService.smallScreen()
            ? 'mobile-contenteditable-input-text-message'
            : 'contenteditable-input-text-message'
        )
        ?.append(document.createTextNode(emoji.value));
      this.sendMessageForm.patchValue({
        text: this.sendMessageForm.value.text + emoji.value,
      });
    } else {
      clearTimeout(this.messageReactionTimeout);
      const args = {
        messageId: this.messageReaction()?.id,
        code: emoji.value,
        act: ChatMessageReactionAct.ADD,
      };
      this.commonService.setRemoveShowGlobalLoading(true);
      const response = await this.guestService.chatMessageReaction(args);
      const _messages = this.conversationSelected()?.messages;
      const _messageIndex = _messages.findIndex(
        (mess: any) => mess.id === args.messageId
      );
      _messages[_messageIndex].reactions = response?.reactions;
      this.conversationSelected.update((currValue) =>
        Object.assign({}, currValue, {
          messages: _messages,
        })
      );
      this.onCloseMessageAction(null);
    }
  }

  async onShowEmoji() {
    const position: any = [
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetX: -10,
        offsetY: 0,
      },
    ];
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(
        this.elementRef.nativeElement.querySelector(
          `#parent-input-text-message`
        )
      )
      .withPositions(position)
      .withViewportMargin(8)
      .withFlexibleDimensions(true)
      .withPush(false);

    this.messageSendEmojiOverlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.overlayTemplates.push(this.messageSendEmojiOverlayRef);
    const portal = new TemplatePortal(
      this.messageReActionTemplate,
      this.viewContainerRef
    );
    this.messageSendEmojiOverlayRef.attach(portal);

    this.messageSendEmojiOverlayRefOutsidePointerEvents =
      this.messageSendEmojiOverlayRef
        .outsidePointerEvents()
        .subscribe((value) => {
          this.onCloseMessageAction(null);
          this.messageSendEmojiOverlayRefOutsidePointerEvents.unsubscribe();
        });
  }

  /** Forward message */
  onForwardMessage() {
    this.forwardMessageForm.reset();
    this.forwardUsers.set(null);
    this.searchUserList.set(null);
    this.addEditDialogSetting = {
      ...this.otherDialogs['forwardMessage'],
      btnOK: 'Gửi',
      btnCancel: 'Hủy',
    };
    if (this.messageActionOverlayRef) {
      const _origin = (
        this.messageActionOverlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy
      )?._origin;
      if ((_origin as HTMLElement)?.id) {
        const messageHoverIdIndex = (_origin as HTMLElement).id.indexOf('_');
        const messageHoverId = (_origin as HTMLElement).id.substring(
          messageHoverIdIndex + 1
        );
        const messageHover = this.conversationSelected()?.messages?.find(
          (item: any) => item.id === messageHoverId
        );
        this.forwardMessageForm.patchValue({
          message: messageHover,
        });
      }
      this.onCloseMessageAction(null);
      this.visibleAddEditDialog = true;
    }
  }

  onSelectedUserForwardMessage(event: any) {
    const userSelected = this.searchUserList().find(
      (item: any) => item.id === event.option.value
    );
    const findUser = this.forwardUsers()?.find(
      (item: any) => item.id === userSelected.id
    );
    if (!findUser) {
      this.forwardUsers.update((value) => [...(value || []), userSelected]);
    }
    this.forwardMessageForm.controls['keyword'].reset();
  }

  onRemoveForwardUser(index: number) {
    const _forwardUsers = _.cloneDeep(this.forwardUsers());
    _forwardUsers.splice(index, 1);
    this.forwardUsers.update((value) => [..._forwardUsers]);
  }

  /** Reply message */
  onReplyMessage() {
    if (this.messageActionOverlayRef) {
      const _origin = (
        this.messageActionOverlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy
      )?._origin;
      if ((_origin as HTMLElement)?.id) {
        const messageHoverIdIndex = (_origin as HTMLElement).id.indexOf('_');
        const messageHoverId = (_origin as HTMLElement).id.substring(
          messageHoverIdIndex + 1
        );
        const messageHover = this.conversationSelected()?.messages?.find(
          (item: any) => item.id === messageHoverId
        );
        this.sendMessageForm.patchValue({
          replyMessage: messageHover,
        });
      }
      this.onCloseMessageAction(null);
      document
        .getElementById(
          this.commonService.smallScreen()
            ? 'mobile-contenteditable-input-text-message'
            : 'contenteditable-input-text-message'
        )
        ?.focus();
    }
  }

  onClearReplyMessage() {
    this.sendMessageForm.patchValue({
      replyMessage: null,
    });
  }

  /** Edit/Delete message */
  onEditMessage(message: any, type: any) {
    this.editMessageMentionMembers.set(
      this.conversationSelected()?.members || []
    );
    const _messages = _.cloneDeep(this.conversationSelected()?.messages);
    const messageHoverIndex = _messages?.findIndex(
      (item: any) => item.id === message.id
    );
    switch (type) {
      case this.ChatMessageAct.DEL:
        if (
          _messages[messageHoverIndex + 1]?.role === MessageRole.OWNER &&
          (_messages[messageHoverIndex - 1]?.role !== MessageRole.OWNER ||
            _messages[messageHoverIndex - 1]?.type ===
            MessageViewType.DATE_GROUP)
        )
          _messages[messageHoverIndex + 1].firstMessage = true;
        _messages.splice(messageHoverIndex, 1);
        const lastMessage: any = _.last(_messages);
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages:
              lastMessage?.type === MessageViewType.DATE_GROUP
                ? _.dropRight(_messages, 1)
                : _messages,
          })
        );
        this.guestService.chatMessageEdit({
          act: ChatMessageAct.DEL,
          messageId: message.id,
        });
        this.onUpdateLastMessageConversation(
          _.last(this.conversationSelected()?.messages)
        );
        break;
      case this.ChatMessageAct.EDIT:
        this.isUpdateEditMessageSelected.set(false);
        const _messageMention = _messages[messageHoverIndex].message.replace(
          this.mentionRegex,
          (match: any) => {
            const mentionUser = this.conversationSelected()?.members?.find(
              (item: any) => `[@${item.user.id}]` === match
            );
            return match !== '[@all]'
              ? `@${mentionUser?.user?.fullname || ''}`
              : `@All`;
          }
        );
        _messages[messageHoverIndex] = {
          ..._messages[messageHoverIndex],
          isEdit: true,
          messageEdited: _messageMention,
          mentionHTML: _messages[messageHoverIndex].mentionHTML 
            || _messages[messageHoverIndex].urlHTML 
            || _messages[messageHoverIndex].message,
        };
        this.conversationSelected.update((currValue) =>
          Object.assign({}, currValue, {
            messages: _messages,
          })
        );
        break;
      case this.ChatMessageAct.COPY:
        const _message =
          message?.message?.replace(this.mentionRegex, (match: any) => {
            const mentionUser = message?.mentionTo?.find(
              (item: any) => `[@${item.id}]` === match
            );
            return match !== '[@all]'
              ? `@${mentionUser?.fullname || ''}`
              : `@All`;
          }) || '';
        navigator.clipboard.writeText(_message).then(() => {
          this.commonService.openSnackBar('Đã sao chép tin nhắn');
        });
        break;
    }
    this.editMessageSelected.set(_messages[messageHoverIndex]);
    this.onCloseMessageAction(null);
  }

  async onSubmitMessageEdit(message: any, isSave: boolean = false) {
    const _messages = _.cloneDeep(this.conversationSelected()?.messages);
    const messageEditIndex = _messages?.findIndex(
      (item: any) => item.id === message.id
    );
    const _hasLink = urlVerify(_messages[messageEditIndex].mentionHTML);
    const mentions = extractMentionSpans(_messages[messageEditIndex].mentionHTML);
    const _messageEdited = replaceMentionSpansWithTokens(_messages[messageEditIndex].mentionHTML);
    if (isSave) {
      this.isUpdateEditMessageSelected.set(true);
      _messages[messageEditIndex] = {
        ..._messages[messageEditIndex],
        isEdit: false,
        hasLink: _hasLink,
        hasMention: !!mentions?.length,
        innerHTML: this.sanitizer.bypassSecurityTrustHtml(
          urlModify(_messages[messageEditIndex].mentionHTML, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
        ),
        message: _messageEdited,
      };
      this.commonService.setRemoveShowGlobalLoading(true);
      await this.guestService.chatMessageEdit({
        act: ChatMessageAct.EDIT,
        messageId: message.id,
        message: _messageEdited,
      });
    } else {
      const innerHTMLString = this.sanitizer.sanitize(SecurityContext.HTML, _messages[messageEditIndex].innerHTML);
      _messages[messageEditIndex] = {
        ..._messages[messageEditIndex],
        messageEdited: _messages[messageEditIndex].message,
        isEdit: false,
        mentionHTML: innerHTMLString,
      };
    }
    this.isUpdateEditMessageSelected.set(false);
    this.conversationSelected.update((currValue) =>
      Object.assign({}, currValue, {
        messages: _messages,
      })
    );
    this.editMessageSelected.set(null);
  }

  onKeydownEditMessage(event: any, message: any) {
    event?.stopPropagation();
    switch (event.key) {
      case '@':
        this.mentionMembers.set([
          {
            user: {
              id: 'all',
              fullname: 'All',
            },
          },
          ...(this.conversationSelected()?.members || []),
        ]);
        this.activeSuggestionIndex = 0;
        this.autocompleteEditMessageTrigger?.openPanel();
        break;
      // case 'Backspace':
      //   if (_.endsWith(message.messageEdited, ' ')) {
      //     this.autocompleteTrigger.closePanel()
      //     return
      //   }
      //   if (Math.abs(this.lastKeyEventTimestamp - event.timeStamp) < 20)
      //     return
      //   break
      case 'Space':
        this.autocompleteEditMessageTrigger?.closePanel();
        break;
      default:
        if (_.endsWith(message.messageEdited, ' ')) {
          this.autocompleteTrigger.closePanel();
          return;
        }
        const lastMention: string =
          _.last(message.messageEdited?.split(' ')) || '';
        if (lastMention?.match(/@([^@\s]+)$/g)?.length) {
          const matchedMentionFilter = _.last(
            lastMention?.match(/@([^@\s]+)$/g)
          )?.replace('@', '');
          const _mentionMembers = this.conversationSelected()?.members?.filter(
            (item: any) =>
              item?.user?.fullname
                ?.toLowerCase()
                ?.includes(matchedMentionFilter?.toLowerCase() || '')
          );
          this.editMessageMentionMembers.set(_mentionMembers);
        }
        break;
    }
  }

  onEditMessageMentionSelected(event: any) {
    const mentionUser = this.conversationSelected()?.members?.find(
      (item: any) => item.user.id === event.option.value
    );
    const _messages = _.cloneDeep(this.conversationSelected()?.messages);
    const messageEditIndex = _messages?.findIndex(
      (item: any) => item.id === this.editMessageSelected().id
    );
    const lastMention: string =
      _.last(_messages[messageEditIndex].messageEdited?.split(' ')) || '';
    if (lastMention?.match(/@([^@\s]+)$/g)?.length) {
      const updateMessageEdited = _messages[
        messageEditIndex
      ].messageEdited?.replace(
        _.last(lastMention?.match(/@([^@\s]+)$/g)),
        mentionUser?.user?.fullname
      );
      _messages[messageEditIndex] = {
        ..._messages[messageEditIndex],
        message: updateMessageEdited,
      };
      if (urlVerify(_messages[messageEditIndex].messageEdited))
        _messages[messageEditIndex] = {
          ..._messages[messageEditIndex],
          hasLink: true,
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_messages[messageEditIndex].messageEdited, this.commonService.smallScreen()).replace(/\r?\n/g, '<br>')
          ),
        };
    }
    this.conversationSelected.update((currValue) =>
      Object.assign({}, currValue, {
        messages: _messages,
      })
    );
    this.autocompleteEditMessageTrigger?.closePanel();
  }

  onHtmlChange(event: any) {
    this.onMentionMember(event, 
      document.getElementById(event.target.id),
      true
    );
  }

  onMentions(event: any) {
    console.log('onMentions',event);
  }

  searchUsers = (q: string): Observable<MentionUser[]> => {
    const all: MentionUser[] = [
      { id: '1', fullname: 'Nguyễn Văn A' },
      { id: '2', fullname: 'Trần Thị B' },
      { id: '3', fullname: 'Lê C' },
    ];
    const res = all.filter(u => u.fullname.toLowerCase().includes(q.toLowerCase()));
    return of(res).pipe(delay(80));
  };
  /** Leave group */
  async onLeaveGroup() {
    this.addEditDialogSetting = {
      ...this.otherDialogs['leaveGroup'],
      btnOK: '',
      btnDelete: 'Rời nhóm',
      btnCancel: 'Hủy',
      templateCode: 'leaveGroup',
    };
    this.visibleAddEditDialog = true;
  }

  async onActionMember(item: any, action: MessageMemberAction) {
    let args = {};
    let response: any = null;
    switch (action) {
      case MessageMemberAction.SEND_MESSAGE:
        this.drawer?.close();
        const conversationDetail =
          await this.guestService.chatConversationDetail('', item?.user?.id);
        if (conversationDetail) {
          const conversations = _.cloneDeep(this.conversations());
          const conversationIndex = conversations?.findIndex(
            (it: any) => it.id === conversationDetail.id
          );
          if (conversationIndex !== -1)
            conversations.splice(conversationIndex, 1);
          this.conversations.update((value) => [
            {
              ...conversationDetail,
              unreadCount: signal(
                conversationDetail?.personalConversation?.unreadCount || 0
              ),
            },
            ...conversations,
          ]);
          await this.onSelectConversation({
            ...conversationDetail,
            unreadCount: signal(
              conversationDetail?.personalConversation?.unreadCount || 0
            ),
          });
        } else {
          this.onCreateConversation(item.user, ChatConversationType.Direct);
        }
        break;
      case MessageMemberAction.REMOVE:
        args = {
          conversationId: this.conversationSelected()?.id,
          memberIds:
            this.conversationSelected()
              ?.members?.filter((it: any) => it.user.id !== item.user.id)
              ?.map((it: any) => it.user.id) || [],
        };
        break;
      case MessageMemberAction.ASSIGN_ADMIN:
        const admins =
          this.conversationSelected()
            ?.members?.filter((it: any) => it.admin)
            ?.map((it: any) => it.user.id) || [];
        args = {
          conversationId: this.conversationSelected()?.id,
          adminIds: [...admins, item.user.id],
        };
        break;
      case MessageMemberAction.REMOVE_ADMIN:
        const adminUpdateIds =
          this.conversationSelected()
            ?.members?.filter(
              (it: any) => it.admin && it.user.id !== item.user.id
            )
            ?.map((it: any) => it.user.id) || [];
        args = {
          conversationId: this.conversationSelected()?.id,
          adminIds: [...adminUpdateIds],
        };
        break;
    }
    switch (action) {
      case MessageMemberAction.SEND_MESSAGE:
        break;
      case MessageMemberAction.REMOVE:
      case MessageMemberAction.ASSIGN_ADMIN:
      case MessageMemberAction.REMOVE_ADMIN:
        response = await this.guestService.conversationGroupEdit(args);
        this.conversationSelected.update((value) =>
          Object.assign({}, value, {
            members: response.members,
          })
        );
        break;
    }
  }

  /** Message search */
  async onSearchMessage(
    tab: any,
    rangeDay: number = 0,
    rangeMonth: number = 0,
    loadMore: boolean = false,
    resetDate: boolean = false
  ) {
    if (this.messageSearchTabSelected()?.id !== tab?.id) {
      this.messageSearchFilter.set(null);
      this.messageSearchResult.set([]);
    }

    this.messageSearchTabSelected.update(() => Object.assign({}, tab));
    this.searchByDate.set(false);
    let filter: any = {
      conversationIds: [this.conversationSelected()?.id],
      keyword: this.conversationSelectedFilterForm.value['keyword'] || '',
      messageTypes: [this.messageSearchTabSelected().type],
      conversationTypes: [this.conversationSelected()?.type],
    };
    filter = {
      ...filter,
      from: this.conversationSelectedFilterForm.value['startAt']
        ? startOfDay(
          new Date(this.conversationSelectedFilterForm.value['startAt'])
        ).getTime()
        : loadMore
          ? this.messageSearchFilter()?.from
            ? this.messageSearchFilter()?.from
            : null
          : null,
      to: this.conversationSelectedFilterForm.value['endAt']
        ? endOfDay(
          new Date(this.conversationSelectedFilterForm.value['endAt'])
        ).getTime()
        : loadMore
          ? this.messageSearchFilter()?.to
            ? this.messageSearchFilter()?.to
            : null
          : null,
    };
    this.conversationSelectedFilterForm.controls['rangeDate'].reset();
    if (resetDate)
      this.conversationSelectedFilterForm.patchValue({
        startAt: null,
        endAt: null,
        rangeDate: null,
      });
    if (rangeDay) {
      this.conversationSelectedFilterForm.patchValue({
        startAt: null,
        endAt: null,
        rangeDate: -1 * rangeDay + ' ngày trước',
      });
      filter = {
        ...filter,
        from: startOfDay(addDays(new Date(), rangeDay)).getTime(),
        to: endOfDay(new Date()).getTime(),
      };
    }
    if (rangeMonth) {
      this.conversationSelectedFilterForm.patchValue({
        startAt: null,
        endAt: null,
        rangeDate: -1 * rangeMonth + ' tháng trước',
      });
      filter = {
        ...filter,
        from: startOfDay(addMonths(new Date(), rangeMonth)).getTime(),
        to: endOfDay(new Date()).getTime(),
      };
    }
    if (this.conversationSelectedFilterForm.value['senderId']?.length)
      filter = {
        ...filter,
        senderIds: this.conversationSelectedFilterForm.value['senderId'],
      };
    this.searchByDate.update((value) => false);
    this.isSearching.set(true);
    if (
      filter.keyword?.length &&
      ![ChatMessageType.IMAGE, ChatMessageType.VIDEO].includes(
        this.messageSearchTabSelected().type
      )
    ) {
      filter = {
        ...filter,
        page: this.messageSearchFilter()?.page || 0,
      };
      this.commonService.setRemoveShowGlobalLoading(true);
      const response = await this.guestService.chatMessageSearch(filter);
      this.messageSearchFilter.update((value) =>
        Object.assign({}, value, {
          from: startOfDay(
            addDays(new Date(_.last<any>(response)?.createdAt), 1)
          ).getTime(),
          to: null,
          isEndSearch: !response?.length,
        })
      );
      const _result = loadMore
        ? [...this.messageSearchResult(), ...(response || [])]
        : response || [];
      this.messageSearchResult.update(() => [..._result]);
    } else {
      filter = {
        conversationId: this.conversationSelected().id,
        type: this.messageSearchTabSelected().type,
        size: 100,
        lastKey: null,
      };
      this.commonService.setRemoveShowGlobalLoading(true);
      const response = await this.guestService.chatMessageList(filter);
      this.messageSearchFilter.set({
        ...filter,
        lastKey: response?.lastKey,
      });
      const _messageFlatten =
        response?.messages?.reduce((arr: any, message) => {
          const urlFlatten = message.urls?.map((_url) => {
            return {
              url: _url,
              ...message,
            };
          });
          arr.push(...(urlFlatten || []));
          return arr;
        }, []) || [];
      const groupByDate = _.groupBy(_messageFlatten, (value) =>
        format(value.createdAt, 'dd/MM/yyyy')
      );
      const _groupByDateParse = Object.keys(groupByDate)
        .sort((a, b) => {
          const dateA = new Date(a.split('/').reverse().join('-'));
          const dateB = new Date(b.split('/').reverse().join('-'));
          return dateB.getTime() - dateA.getTime();
        })
        .map((key) => {
          return {
            date: key,
            messages: groupByDate[key],
          };
        });
      const _result = loadMore
        ? [...this.messageSearchResult(), ..._groupByDateParse]
        : _groupByDateParse;
      this.messageSearchResult.update(() => [..._result]);
    }
    this.isSearching.set(false);
  }

  async onSearchMoreMessage(index: number) {
    if (
      this.messageSearchTabSelected()?.type === ChatMessageType.IMAGE &&
      !this.messageSearchFilter()?.lastKey
    ) {
      return;
    }
    if (index === this.messageSearchResult()?.length - 1) {
      await this.onSearchMessage(this.messageSearchTabSelected(), 0, 0, true);
    }
  }

  async onViewMessageSearch(mess: any, reply: boolean = false) {
    this.messageSearchSelected.set(reply ? null : mess);
    if (
      compareAsc(
        new Date(mess.createdAt),
        new Date(this.conversationSelected().messages?.[1]?.createdAt)
      ) === -1
    ) {
      await this.onGetMessage({
        ...this.conversationMessageFilter,
        lastKey: {
          // ...this.conversationMessageFilter?.lastKey,
          createdAt: mess.createdAt,
          conversationId: this.conversationSelected().id,
        },
      });
    }
    // const messElement = document.getElementById(`${mess.type}_${mess.id}`);
    const messElement = document.getElementById(`parent_${mess.id}`);
    if (messElement) {
      document
        .getElementById(this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv')
        ?.scrollTo(0, messElement.offsetTop - 100);
    } else {
      document
        .getElementById(this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv')
        ?.scrollTo(0, 0);
    }
  }

  onUpdateLastMessageConversation(message: any, conversationId = null) {
    const _conversations = _.cloneDeep(this.conversations());
    const conversationIndex = _conversations.findIndex(
      (conv: any) =>
        conv.id === (conversationId || this.conversationSelected().id)
    );
    if (conversationIndex > -1) {
      let lastMessage = '';
      switch (message?.type) {
        case ChatMessageType.TEXT:
        case ChatMessageType.LOCATION:
          lastMessage =
            message?.message?.replace(this.mentionRegex, (match: any) => {
              const mentionUser = message?.mentionTo?.find(
                (item: any) => `[@${item.id}]` === match
              );
              return match !== '[@all]'
                ? `@${mentionUser?.fullname || ''}`
                : `@All`;
            }) || '';
          break;
        case ChatMessageType.DOC:
          lastMessage = `[File]${message?.fileName}`;
          break;
        case ChatMessageType.IMAGE:
          lastMessage = `[Image]`;
          break;
        case ChatMessageType.VIDEO:
          lastMessage = `[Video]`;
          break;
      }
      _conversations[conversationIndex] = {
        ..._conversations[conversationIndex],
        lastMessage: {
          ..._conversations[conversationIndex].lastMessage,
          id: message?.id,
          message: lastMessage,
        },
        lastMessageAt: message?.createdAt,
      };
      this.conversations.update(() => [..._conversations]);
    }
  }

  clearQueryParam(param: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    this.location.replaceState(url.pathname + url.search); // Cập nhật URL mà không load lại trang
  }

  countReactions(reactions: Reaction[]): number {
    return reactions?.reduce(
      (total, reaction) => total + reaction.reactors?.length,
      0
    );
  }

  getUniqueReactors(reactions: Reaction[]): {
    all: { fullname: string; code: string; imageUrls: string[] }[];
    unique: string[];
  } {
    const allNames = new Set<{
      fullname: string;
      code: string;
      imageUrls: string[];
    }>();
    const uniqueNames = new Set<string>();

    reactions.forEach((reaction) => {
      reaction.reactors.forEach((reactor) => {
        uniqueNames.add(reactor.fullname);
        allNames.add({
          fullname: reactor.fullname,
          code: reaction.code,
          imageUrls: reactor.imageUrls,
        });
      });
    });

    return { unique: Array.from(uniqueNames), all: Array.from(allNames) };
  }

  onShowReactionDetails(message: any) {
    this.reactionDetails.set(message.reactions);
    this.reactionDetailsOrigin.set(message.reactions);
    this.addEditDialogSetting = {
      ...this.otherDialogs['reactionDetails'],
      header: 'Cảm xúc',
      btnOK: '',
      btnCancel: '',
      btnDelete: '',
    };
    this.visibleAddEditDialog = true;
  }

  onReactionView(code: string) {
    if (code === 'all') {
      this.reactionDetails.set(this.reactionDetailsOrigin());
    } else {
      this.reactionDetails.set(
        this.reactionDetailsOrigin().filter((item) => item.code === code)
      );
    }
  }

  generateActionText(message: OfficeChatMessage) {
    const action = message.actionType;
    const senderName = message.sender?.fullname || '';
    const oldValue = message.oldValue || '';
    const newValue = message.newValue || '';
    const users = message.targetUsers?.map(x => x.fullname)?.join(', ');
    switch (action) {
      case ConversationActionType.ADD_MEMBER:
        return `${senderName} đã thêm ${users} vào cuộc trò chuyện.`;
      case ConversationActionType.CHANGE_AVATAR:
        return `${senderName} đã thay đổi ảnh đại diện của cuộc trò chuyện.`;
      case ConversationActionType.CHANGE_BACKGROUND:
        return `${senderName} đã thay đổi hình nền của cuộc trò chuyện.`;
      case ConversationActionType.CHANGE_NAME:
        return `${senderName} đã đổi tên cuộc trò chuyện từ "${oldValue}" thành "${newValue}".`;
      case ConversationActionType.CREATE_CONVERSATION:
        return `${senderName} đã tạo cuộc trò chuyện mới.`;
      case ConversationActionType.DEMOTE_ADMIN:
        return `${senderName} đã hạ cấp một quản trị viên trong cuộc trò chuyện.`;
      case ConversationActionType.LEAVE_CONVERSATION:
        return `${senderName} đã rời khỏi cuộc trò chuyện.`;
      case ConversationActionType.PIN_MESSAGE:
        return `${senderName} đã ghim một tin nhắn trong cuộc trò chuyện.`;
      case ConversationActionType.PROMOTE_ADMIN:
        return `${senderName} đã thăng cấp một thành viên lên quản trị viên.`;
      case ConversationActionType.REMOVE_MEMBER:
        return `${senderName} đã xóa ${users} khỏi cuộc trò chuyện.`;
      case ConversationActionType.UNPIN_MESSAGE:
        return `${senderName} đã bỏ ghim một tin nhắn trong cuộc trò chuyện.`;
      default:
        return "Hành động không xác định.";
    }
  }

  formatReplyMention(message: OfficeChatMessage) {
    const messageReplyOrigin = message.replyMessage?.message;
    if (messageReplyOrigin?.match(this.mentionRegex)?.length) {
      const _messageReplyMention = messageReplyOrigin?.replace(
        this.mentionRegex,
        (match: any) => {
          const mentionUser = this.conversationSelected()?.members?.find(
            (item: any) => `[@${item?.user?.id}]` === match
          );
          return match !== '[@all]'
            ? `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
            `data-id="${mentionUser?.user?.id}" data-fullname="${mentionUser?.user?.fullname}">` +
            `@${mentionUser?.user?.fullname || ''}</span>`
            : `<span class="mention no-underline text-blue-300-chat owner-color cursor-pointer"` +
            `data-id="all" data-fullname="Tất cả">` +
            `@All</span>`;
        }
      );
      return _messageReplyMention
    }
    return messageReplyOrigin
  }

  // Vị trí hiển thị tooltip
  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8,
    },
  ];
  getMentionAfterAt(rootEl: any) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return '';

    // Lấy toàn bộ text của editor
    const fullText = rootEl.innerText;

    // Lấy vị trí caret trong toàn bộ text
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(rootEl);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caretPos = preCaretRange.toString().length;

    // Quét ngược tối đa 4 khoảng trắng hoặc dừng khi gặp xuống dòng
    let spaces = 0;
    let start = caretPos;
    while (start > 0) {
      const ch = fullText.charAt(start - 1);
      if (ch === '\n') break;
      if (ch === ' ') {
        spaces++;
        if (spaces > 4) break; // chỉ cho phép tối đa 4 khoảng trắng
      }
      start--;
    }

    // Cửa sổ cần xét là từ 'start' đến 'caretPos'
    const windowText = fullText.slice(start, caretPos);

    // Tìm ký tự '@' gần caret nhất trong cửa sổ này
    const atInWindow = windowText.lastIndexOf('@');
    if (atInWindow === -1) return '';

    // Cụm mention ứng viên (từ '@' đến caret)
    const candidate = windowText.slice(atInWindow, windowText.length);

    // Ràng buộc an toàn: không chứa xuống dòng, không quá 4 khoảng trắng
    if (candidate.includes('\n')) return '';
    const spaceCount = (candidate.match(/ /g) || []).length;
    if (spaceCount > 4) return '';

    return candidate.trim();
  }

  async onDownloadFile(item: any) {
    if (this.commonService.smallScreen()) {
      // this.commonService.openSnackBar('Đang tải file');
      // fetch(item.urls[0])
      //   .then(response => response.blob())
      //   .then(blob => {
      //     saveAs(blob, item.fileName);
      //   })\
      (window as any).flutter_inappwebview.callHandler('downloadFile', item.urls[0], item.fileName);
    } else {
      // const a = document.createElement('a');
      // a.href = item.urls[0];
      // a.download = item.fileName;
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
      window.open(item.urls[0], '_blank');
    }
  }

  scrollActiveIntoView() {
    const panelEl: HTMLElement | undefined = this.auto?.panel?.nativeElement;
    if (!panelEl) return;

    const optionEls = panelEl.querySelectorAll<HTMLElement>('mat-option');
    const opt = optionEls[this.activeSuggestionIndex];
    if (!opt) return;

    const panelRect = panelEl.getBoundingClientRect();
    const optRect = opt.getBoundingClientRect();

    // nếu option nằm phía trên vùng nhìn thấy
    if (optRect.top < panelRect.top) {
      panelEl.scrollTop += (optRect.top - panelRect.top);
    }

    // nếu option nằm phía dưới vùng nhìn thấy
    if (optRect.bottom > panelRect.bottom) {
      panelEl.scrollTop += (optRect.bottom - panelRect.bottom);
    }
  }

  // Kéo thả file
  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverFile.set(true);
    this.dragCounter++;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverFile.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragCounter = Math.max(0, this.dragCounter - 1);
    if (this.dragCounter === 0) this.isDragOverFile.set(false);
  }

  async onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverFile.set(false);
    this.dragCounter = 0;
    const files = event.dataTransfer?.files;
    if (files?.length) {
      await this.onSendMessage(event, ChatMessageType.DOC, true);
    }
  }

  async countUnreadMessageGlobal() {
    const unreadCount = this.conversations()?.reduce((total:number, conv:any) => {
      if (conv?.unreadCount() > 0) total += conv?.unreadCount();
      return total;
    }, 0)
    this.commonService.messageNotification.set({
      unreadCount,
      conversationSelectedId: this.conversationSelected()?.id,
    })
  }
}

export enum MessageViewType {
  DATE_GROUP = 'DATE_GROUP',
}

export enum MessageRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export enum MessageMemberAction {
  SEND_MESSAGE = 'SEND_MESSAGE',
  REMOVE = 'REMOVE',
  ASSIGN_ADMIN = 'ASSIGN_ADMIN',
  REMOVE_ADMIN = 'REMOVE_ADMIN',
}

interface Reaction {
  code: string;
  reactorIds: string[];
  reactors: { fullname: string; imageUrls: string[] }[];
}
