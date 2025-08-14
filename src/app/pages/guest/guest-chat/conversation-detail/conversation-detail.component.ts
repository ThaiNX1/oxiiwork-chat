import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ChatConversationGroupType,
  ChatConversationType,
  ChatMessageAct,
  ChatMessageReactionAct,
  ChatMessageType,
  ConversationActionType,
  OfficeChatMessage,
} from '../../../../commons/types';
import { BaseGuestClass } from '../../../../commons/base-guest.class';
import { MatDrawer } from '@angular/material/sidenav';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import _ from 'lodash';
import * as uuid from 'uuid';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MessageViewType, MessageRole } from '../guest-chat.component';
import { urlVerify, urlModify } from '../../../../core/utils/utils';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DomSanitizer } from '@angular/platform-browser';
import { GuestService } from '../../guest.service';
import { compareAsc, startOfDay, format } from 'date-fns';
import { BehaviorSubject, debounceTime, forkJoin } from 'rxjs';
import { UploadFileService } from '../../../../core/services/upload-file.service';
import { WebsocketService } from '../../../../core/services/Websocket.service';
import { constant } from '../../../../core/constants/constant';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrl: './conversation-detail.component.scss',
})
export class ConversationDetailComponent
  extends BaseGuestClass
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() conversationSelectedInput: any;
  @Output() onLoadMoreMessage = new EventEmitter<any>();
  @Output() onViewMessageSearch = new EventEmitter<any>();

  ChatConversationType = ChatConversationType;
  partnerInformation = signal<any>(null);
  searchUserList = signal<any>([]);
  messageSearchFilter = signal<any>(null);
  messageSearchResult = signal<any>(null);
  messageHover = signal<any>(null);
  scrollToEnd = signal(false);
  messageSearchSelected = signal<any>(null);
  reactionDetails = signal<Reaction[]>([]);
  reactionDetailsOrigin = signal<Reaction[]>([]);
  senderTyping = signal<any>(null);
  geolocationCurrentPosition = signal<any>(null);
  conversations = signal<any>([]);
  emojis = signal<any>([]);
  conversationSelected = signal<any>(null);

  /** Edit Message */
  @ViewChild('autocompleteEditMessageTrigger')
  autocompleteEditMessageTrigger!: MatAutocompleteTrigger;
  editMessageMentionMembers = signal<any>([]);
  editMessageSelected = signal<any>(null);
  isUpdateEditMessageSelected = signal(true);

  /** Mention */
  @ViewChild('autocompleteTrigger')
  autocompleteTrigger!: MatAutocompleteTrigger;
  mentionMembers = signal<any>([]);
  activeSuggestionIndex = 0;
  lastKeyEventTimestamp = 0;

  /** Forward Message */
  lastPasteEventTimestamp = 0;

  /** Forward Message */
  forwardMessageForm!: FormGroup;
  forwardUsers = signal<any>([]);

  newGroupConversationForm!: FormGroup;
  groupConversationMemberArray!: FormArray;
  sendMessageForm!: FormGroup;

  messageActionOverlayRef!: OverlayRef;
  messageSendEmojiOverlayRef!: OverlayRef;
  messageActionOverlayRefOutsidePointerEvents!: any;
  messageSendEmojiOverlayRefOutsidePointerEvents!: any;

  overlayTemplates: any = [];

  myCanvasContext: any;
  widthCompare: number = 0;
  messageFiles: any = [];
  ChatMessageAct = {
    ...ChatMessageAct,
    COPY: 'COPY',
  };
  mentionRegex =
    /\[@[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\]|\[@all\]/gm;
  urlRegex = /((http|https)?:\/\/[^\s]+)/g;

  MessageRole = MessageRole;
  ChatMessageType = ChatMessageType;
  MessageViewType = { ...MessageViewType, ...ChatMessageType };

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('messageActionTemplate') messageActionTemplate!: TemplateRef<any>;

  /** Message action */
  @ViewChild('messageReActionTemplate')
  messageReActionTemplate!: TemplateRef<any>;
  messageReActionOverlayRef!: OverlayRef;
  messageReactionTimeout: any;
  messageReaction = signal<any>(null);
  sendMessageTextChangeBehavior = new BehaviorSubject<string>('');

  sanitizer = inject(DomSanitizer);
  guestService = inject(GuestService);
  cdr = inject(ChangeDetectorRef);
  uploadFileService = inject(UploadFileService);
  websocketService = inject(WebsocketService);

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.conversationSelected.set(this.conversationSelectedInput);
  }

  ngOnInit(): void {
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

    this.sendMessageForm = new FormGroup({
      text: new FormControl(null),
      image: new FormControl(null),
      file: new FormControl(null),
      emoji: new FormControl(null),
      replyMessage: new FormControl(null),
    });

    this.forwardMessageForm = new FormGroup({
      keyword: new FormControl(null),
      message: new FormControl(null),
      note: new FormControl(null),
    });

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
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.myCanvasContext = canvas?.getContext('2d');
    this.myCanvasContext.font = '14px Inter';
    this.widthCompare = this.commonService.smallScreen()
      ? document.body.clientWidth * 0.75
      : (document.body.clientWidth - 450) * 0.75;
  }

  onShowPartnerInfo() {
    if (this.conversationSelected()?.type === ChatConversationType.Group)
      return;
    const _partner = this.conversationSelected()?.members?.find(
      (mem: any) => mem?.user?.id !== this.user?.id
    );
    this.partnerInformation.set(_partner);
    this.conversationSelected.update((currentValue: any) =>
      Object.assign({}, currentValue, {
        showSearch: false,
        showMember: false,
        showInfo: true,
      })
    );
    if (this.commonService.smallScreen()) {
      this.commonService.slideNavConfig.update((currValue: any) =>
        Object.assign({}, currValue, {
          position: 'end',
          disableClose: true,
        })
      );
      this.commonService.openSlideNav.set(true);
    } else this.drawer?.open();
  }

  onShowMemberGroup() {
    this.conversationSelected.update((currentValue: any) =>
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

  async onSearchInConversation() {
    this.conversationSelected.update((currentValue: any) =>
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

  onScrollMessage(event: any) {
    // console.log('onScrollMessage', event);
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
          positionStrategy,
          scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.overlayTemplates.push(this.messageReActionOverlayRef);
        const portal = new TemplatePortal(
          this.messageReActionTemplate,
          this.viewContainerRef
        );
        this.messageReActionOverlayRef.attach(portal);
      }, 500);
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
      this.conversationSelected.update((currValue: any) =>
        Object.assign({}, currValue, {
          messages: _messages,
        })
      );
      this.onCloseMessageAction(null);
    }
  }

  onShowMessageAction(item: any) {
    if (
      item.type === MessageViewType.DATE_GROUP ||
      item.type === ChatMessageType.LOG
    )
      return;
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
    const messageElement = document.getElementById(`${item.type}_${item.id}`);
    const messageDivElement = document.getElementById(
      this.commonService.smallScreen() ? 'mobile_messageDiv' : 'messageDiv'
    );
    const textWidth = this.myCanvasContext.measureText(message).width;
    const position: any = this.commonService.smallScreen()
      ? [
          {
            originX: item.role === MessageRole.OWNER ? 'start' : 'end',
            originY: 'top',
            overlayX: item.role === MessageRole.OWNER ? 'start' : 'end',
            overlayY: 'bottom',
            offsetY: -10,
            offsetX: item.role === MessageRole.OWNER ? -30 : 30,
          },
        ]
      : this.commonService.smallScreen() ||
        textWidth > this.widthCompare ||
        1.5 * (messageElement?.offsetWidth || 0) >
          (messageDivElement?.offsetWidth || 0)
      ? [
          {
            originX: item.role === MessageRole.OWNER ? 'start' : 'end',
            originY: 'top',
            overlayX: item.role === MessageRole.OWNER ? 'start' : 'end',
            overlayY: 'bottom',
            offsetY: -10,
          },
        ]
      : [
          {
            originX: item.role === MessageRole.OWNER ? 'start' : 'end',
            originY: 'center',
            overlayX: item.role === MessageRole.OWNER ? 'end' : 'start',
            overlayY: 'center',
            offsetX: item.role === MessageRole.OWNER ? -10 : 10,
          },
        ];
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
      hasBackdrop: this.commonService.smallScreen() ? true : false,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const portal = new TemplatePortal(
      this.messageActionTemplate,
      this.viewContainerRef,
      { item: item }
    );
    this.messageActionOverlayRef.attach(portal);
    this.messageActionOverlayRefOutsidePointerEvents =
      this.messageActionOverlayRef.outsidePointerEvents().subscribe((value) => {
        setTimeout(() => {
          this.onCloseMessageAction(item);
        });
        this.messageActionOverlayRefOutsidePointerEvents.unsubscribe();
      });
  }

  onCloseMessageAction(item: any) {
    if (this.messageActionOverlayRef) {
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

  generateActionText(message: OfficeChatMessage) {
    const action = message.actionType;
    const senderName = message.sender?.fullname || '';
    const oldValue = message.oldValue || '';
    const newValue = message.newValue || '';
    const users = message.targetUsers?.map((x) => x.fullname)?.join(', ');
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
        return 'Hành động không xác định.';
    }
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
        this.autocompleteEditMessageTrigger.openPanel();
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
        this.autocompleteEditMessageTrigger.closePanel();
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
            urlModify(_messages[messageEditIndex].messageEdited)
          ),
        };
    }
    this.conversationSelected.update((currValue: any) =>
      Object.assign({}, currValue, {
        messages: _messages,
      })
    );
    this.autocompleteEditMessageTrigger.closePanel();
  }

  async onSubmitMessageEdit(message: any, isSave: boolean = false) {
    const _messages = _.cloneDeep(this.conversationSelected()?.messages);
    const messageEditIndex = _messages?.findIndex(
      (item: any) => item.id === message.id
    );
    if (isSave) {
      this.isUpdateEditMessageSelected.set(true);
      _messages[messageEditIndex] = {
        ..._messages[messageEditIndex],
        message: _messages[messageEditIndex].messageEdited,
        isEdit: false,
        hasLink: urlVerify(_messages[messageEditIndex].messageEdited),
      };
      if (urlVerify(_messages[messageEditIndex].messageEdited))
        _messages[messageEditIndex] = {
          ..._messages[messageEditIndex],
          hasLink: true,
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_messages[messageEditIndex].messageEdited)
          ),
        };
      // if (_messages[messageEditIndex].messageEdited?.match(this.mentionRegex)?.length)

      // const _messageMention = _newMessage.message.replace(this.mentionRegex, (match: any) => {
      //   const mentionUser = this.conversationSelected()?.members?.find((item: any) => `[@${item.user.id}]` === match)
      //   return (`<span class="no-underline text-blue-300-chat owner-color cursor-pointer"`
      //     + `data-id="${mentionUser?.user?.id}" data-fullname="${mentionUser?.user?.fullname}">`
      //     + `@${mentionUser?.user?.fullname || ''}</span>`)
      // })
      // _newMessage = {
      //   ..._newMessage,
      //   hasMention: true,
      //   innerHTML: this.sanitizer.bypassSecurityTrustHtml(urlModify(_messageMention))
      // }
      this.commonService.setRemoveShowGlobalLoading(true);
      await this.guestService.chatMessageEdit({
        act: ChatMessageAct.EDIT,
        messageId: message.id,
        message: message.messageEdited,
      });
    } else {
      _messages[messageEditIndex] = {
        ..._messages[messageEditIndex],
        messageEdited: _messages[messageEditIndex].message,
        isEdit: false,
      };
    }
    this.isUpdateEditMessageSelected.set(false);
    this.conversationSelected.update((currValue: any) =>
      Object.assign({}, currValue, {
        messages: _messages,
      })
    );
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

  onRemoveFile(index: number) {
    if (this.messageFiles?.length) this.messageFiles.splice(index, 1);
    else this.onResizeTextboxChat();
  }

  onResizeTextboxChat() {
    const elemP: any = document
      .getElementById(
        this.commonService.smallScreen()
          ? 'mobile-input-text-message'
          : 'input-text-message'
      )
      ?.querySelector('p');
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
      this.conversationSelected.update((value: any) =>
        Object.assign({}, value, { multipleLineTextbox: true })
      );
      this.cdr.detectChanges();
    } else {
      this.conversationSelected.update((value: any) =>
        Object.assign({}, value, { multipleLineTextbox: false })
      );
      if (!elemP.innerText?.trim()?.length) {
        // @ts-ignore
        document.querySelector('[contenteditable]').innerHTML = '';
      }
      this.cdr.detectChanges();
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
      text: `${element?.textContent}${
        event?.key?.length === 1 ? event?.key : ''
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

        const _locationMessage = `https://www.google.com/maps/place/${
          this.geolocationCurrentPosition().longitude
        },${this.geolocationCurrentPosition().latitude}`;
        args = {
          conversationId: this.conversationSelected().id,
          message: _locationMessage,
          type: ChatMessageType.LOCATION,
          hasLink: true,
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_locationMessage)
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
            args = {
              ...args,
              message: _message?.replace('\u0000', ' ')?.replace('\u00A0', ' '),
              hasMention: hasMention,
              hasLink: urlVerify(_message),
              innerHTML: this.sanitizer.bypassSecurityTrustHtml(
                urlModify(_message)
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
              ? `<span class="no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="${mentionUser?.id}" data-fullname="${mentionUser?.fullname}">` +
                  `@${mentionUser?.user?.fullname || ''}</span>`
              : `<span class="no-underline text-blue-300-chat owner-color cursor-pointer"` +
                  `data-id="all" data-fullname="Tất cả">` +
                  `@All</span>`;
          }
        );
        _newMessage = {
          ..._newMessage,
          innerHTML: this.sanitizer.bypassSecurityTrustHtml(
            urlModify(_messageMention)
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
        this.conversationSelected.update((currValue: any) =>
          Object.assign({}, currValue, {
            messages: [
              ...currValue.messages,
              _newMessageDateGroup,
              ..._newMessages,
            ],
          })
        );
      } else {
        this.conversationSelected.update((currValue: any) =>
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
      // const responses = await Promise.all([
      // (args?.message?.length || args?.fileName) && this.guestService.chatMessageAdd(args, _localMessageId),
      // this.messageFiles?.length && this.guestService.chatMessageAdd(argsMedia, _localMediaMessageId),
      // ])
      // if (responses?.length) {
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
          error: (err: any) => {},
        });
        this.messageFiles = [];
      }
      // if (this.conversationSelected().id === this.conversationSelected().tempId) {
      //   const _conversations = _.cloneDeep(this.conversations())
      //   const _conversationIndex = _conversations?.findIndex((item: any) => item.id === this.conversationSelected().id)
      //   _conversations[_conversationIndex] = {
      //     ..._conversations[_conversationIndex],
      //     id: responses[0]?.conversationId,
      //     tempId: null
      //   }
      //   this.conversationSelected.update((value) => Object.assign({}, value, {
      //     id: responses[0]?.conversationId,
      //     tempId: null
      //   }))
      //   this.conversations.update((value) => [..._conversations])
      // }
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
              (err: any) => {}
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
      this.conversationSelected.update((value: any) =>
        Object.assign({}, value, {
          id: conversationId,
          tempId: null,
        })
      );
      this.conversations.update((value: any) => [..._conversations]);
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
    this.conversationSelected.update((currValue: any) =>
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

  onMentionMember(event: any, element: any = null): boolean {
    if (event.key === '@') {
      this.mentionMembers.set([
        {
          user: {
            id: 'all',
            fullname: 'All',
          },
        },
        ...(this.conversationSelected()?.members || []),
      ]);
      this.autocompleteTrigger.openPanel();
      return true;
    }

    switch (event.code) {
      case 'Escape':
        this.autocompleteTrigger.closePanel();
        break;
      case 'Backspace':
        const textContent = element?.textContent || '';
        if (_.endsWith(textContent, ' ')) {
          this.autocompleteTrigger.closePanel();
          return true;
        }
        if (Math.abs(this.lastKeyEventTimestamp - event.timeStamp) < 20) {
          this.lastKeyEventTimestamp = event.timeStamp;
          return true;
        }
        this.lastKeyEventTimestamp = 0;
        const selection = window.getSelection();
        const focusNode = selection?.focusNode as Node;
        if (focusNode.nodeType === Node.TEXT_NODE) {
          element?.querySelectorAll('span').forEach((item: any) => {
            if (item === focusNode.parentNode) {
              item.remove();
            }
          });
        } else if (focusNode.nodeType === Node.ELEMENT_NODE) {
        }
        break;
      case 'Space':
        this.autocompleteTrigger.closePanel();
        event.preventDefault();
        this.onReRenderMessage(0, {});
        break;
    }

    this.sendMessageTextChangeBehavior.next(element?.textContent || '');

    if (this.autocompleteTrigger.panelOpen) {
      switch (event.key) {
        case 'Space':
        case 'Escape':
          this.autocompleteTrigger.closePanel();
          return true;
        case 'ArrowDown':
          event.preventDefault();
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex + 1) % this.mentionMembers().length;
          return true;
        case 'ArrowUp':
          event.preventDefault();
          this.activeSuggestionIndex =
            (this.activeSuggestionIndex - 1 + this.mentionMembers().length) %
            this.mentionMembers().length;
          return true;
        case 'Enter':
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
          this.autocompleteTrigger.closePanel();
          event.preventDefault();
          return true;
        default:
          const currentSelection = document.getSelection();
          if (
            currentSelection?.focusNode?.textContent
              ?.slice(0, currentSelection?.focusOffset)
              ?.match(/@([^@\s]+)$/g)?.length ||
            currentSelection?.focusNode?.textContent
              ?.slice(0, currentSelection?.focusOffset)
              ?.match(/@$/g)?.length
          ) {
            const matchedMentionFilter =
              _.last(
                currentSelection?.focusNode?.textContent
                  ?.slice(0, currentSelection?.focusOffset)
                  ?.match(/@([^@\s]+)$/g)
              ) ||
              _.last(
                currentSelection?.focusNode?.textContent
                  ?.slice(0, currentSelection?.focusOffset)
                  ?.match(/@$/g)
              );
            const _mentionMembers =
              this.conversationSelected()?.members?.filter((item: any) =>
                item?.user?.fullname
                  ?.toLowerCase()
                  ?.includes(
                    matchedMentionFilter?.toLowerCase()?.substring(1) || ''
                  )
              );
            this.mentionMembers.set(_mentionMembers);
          } else {
            this.mentionMembers.set([
              {
                user: {
                  id: 'all',
                  fullname: 'All',
                },
              },
              ...(this.conversationSelected()?.members || []),
            ]);
          }
          break;
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
  }

  onReRenderMessage(lengthRegex: number = 0, deleteMention: any = null) {
    if (!deleteMention) {
      const anchor = document.createElement('span');
      anchor.textContent = `@${
        this.mentionMembers()[this.activeSuggestionIndex].user?.fullname
      }`;
      anchor.dataset['id'] =
        this.mentionMembers()[this.activeSuggestionIndex].user?.id;
      anchor.dataset['fullname'] =
        this.mentionMembers()[this.activeSuggestionIndex].user?.fullname;
      anchor.className =
        'no-underline text-blue-300-chat owner-color cursor-pointer';

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
      textElement = document.createTextNode('\0');
    else textElement = document.createTextNode('\u00A0');
    range?.insertNode(textElement);
    range?.setEndAfter(textElement);
    range?.setStartAfter(textElement);
    selection?.removeAllRanges();
    selection?.addRange(range as Range);
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

  /** Edit/Delete message */
  onEditMessage(message: any, type: any) {
    this.editMessageMentionMembers.set(
      this.conversationSelected()?.members || []
    );
    this.editMessageSelected.set(message);
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
        this.conversationSelected.update((currValue: any) =>
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
        };
        this.conversationSelected.update((currValue: any) =>
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
              // await this.onGetConversationDetail(response.id);
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
}

interface Reaction {
  code: string;
  reactorIds: string[];
  reactors: { fullname: string; imageUrls: string[] }[];
}
