import { Component, inject, Injector, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import * as _ from 'lodash';
import { debounceTime } from 'rxjs/operators';
import { BaseGuestClass } from '../../../../commons/base-guest.class';
import {
  ChatConversationGroupType,
  ChatConversationType,
  ConversationActionType,
} from '../../../../commons/types';
import { UploadFileService } from '../../../../core/services/upload-file.service';
import { Push } from '../../guest-chat/state/conversation.state';
import { GuestService } from '../../guest.service';

@Component({
  selector: 'app-conversation-create',
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.scss',
})
export class ConversationCreateComponent extends BaseGuestClass {
  protected readonly ChatConversationType = ChatConversationType;
  protected readonly ConversationActionType = ConversationActionType;
  protected searchUsers = signal<any[]>([]);
  protected showFilterForm = signal(false);
  protected routerParameterType = signal<string | null>(null);
  protected newConversationInfo = signal<any>(null);
  newGroupConversationForm!: FormGroup;
  groupConversationMemberArray!: FormArray;

  /** Service */
  private readonly guestService = inject(GuestService);
  private readonly activatedRoute = inject(ActivatedRoute);
  // private readonly router = inject(Router);

  constructor(
    private readonly router: Router,
    private injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      keyword: new FormControl(null),
    });
    this.onBaseInit();
    this.onValueChange();
  }

  private onBaseInit(): void {
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
    this.groupConversationMemberArray = this.newGroupConversationForm.controls[
      'groupConversationMemberArray'
    ] as FormArray;
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.routerParameterType.set(param?.type ?? null);
      switch (param?.type) {
        case ChatConversationType.Direct:
          this.newConversationInfo.set({
            name: 'Trò truyện mới',
            type: param?.type,
            action: param?.action,
            conversationId: param?.conversationId,
          });
          break;
        case ChatConversationType.Group:
          this.newConversationInfo.set({
            name:
              param?.action === ConversationActionType.ADD_MEMBER
                ? 'Thêm thành viên'
                : 'Tạo nhóm chat',
            type: param?.type,
            action: param?.action,
            conversationId: param?.conversationId,
          });
          break;
      }
    });
  }

  private onValueChange(): void {
    this.filterForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async value => {
        if (value) {
          // await this.onSearchUser(ChatConversationType.Direct)
          const response = await this.guestService.conversationGetUserList({
            keyword: value,
            page: 0,
            size: 20,
          });
          this.searchUsers.set(response?.officeUsers || []);
        } else {
          this.searchUsers.set([]);
        }
      });
    this.newGroupConversationForm.controls['keyword'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(async value => {
        if (value) {
          await this.onSearchUser(ChatConversationType.Group);
        }
      });
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
      this.groupConversationMemberArray?.getRawValue()?.map(item => item.id) ||
      [];
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
    this.searchUsers.set(_officeUsers);
  }

  protected onCreateConversation(user: any, type: ChatConversationType): void {
    switch (type) {
      case ChatConversationType.Direct:
        void this.router.navigate(['/guest/chat'], {
          queryParams: {
            receiverId: user.id,
          },
        });
        break;
      case ChatConversationType.Group:
        const checkUserExist = this.groupConversationMemberArray
          .getRawValue()
          ?.find(it => it.id === user.id);
        if (checkUserExist) return;
        this.groupConversationMemberArray.push(
          new FormGroup({
            id: new FormControl(user.id),
            fullname: new FormControl(user.fullname),
            imageUrls: new FormControl(user.imageUrls),
          })
        );
        break;
    }
  }

  /** Thêm cuộc hội thoại */
  onUploadAvatar(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.newGroupConversationForm.patchValue({
        avatarUrl: e.target?.result,
        fileUpload: event.target.files[0],
      });
    };
    reader.readAsDataURL(file);
  }

  removeMemberFromGroup(index: number) {
    this.groupConversationMemberArray.removeAt(index);
  }

  async onCreateGroupConversation() {
    let args: any = {
      name: this.newGroupConversationForm.value.name,
      groupType: ChatConversationGroupType.Public,
      memberIds: [
        ...this.groupConversationMemberArray.getRawValue()?.map(it => it.id),
        // this.user.id
      ],
    };
    let messageResult = '';
    let response: any;
    switch (this.newConversationInfo()?.action) {
      case ConversationActionType.ADD_MEMBER:
        messageResult = 'Thêm thành viên thành công';
        const conversation =
          await this.guestService.chatConversationGetMemberDetail(
            this.newConversationInfo()?.conversationId
          );
        const currentMemberIds = conversation?.members?.map(it => it.id) || [];
        args = {
          ...args,
          memberIds: _.uniq([
            ...currentMemberIds,
            ...args.memberIds,
          ]),
        };
        response = await this.guestService.conversationGroupEdit(args);
        break;
      default:
        messageResult = 'Tạo nhóm thành công';
        this.newGroupConversationForm.markAllAsTouched();
        if (this.newGroupConversationForm.invalid) return;
        if (this.newGroupConversationForm.value.fileUpload) {
          const uploadLinkResponse = await this.injector
            .get(UploadFileService)
            .storageGeneratePresignedUrls({
              files: [
                {
                  fileName: this.newGroupConversationForm.value.fileUpload.name,
                  fileType: this.newGroupConversationForm.value.fileUpload.type,
                },
              ],
            });
          if (uploadLinkResponse) {
            args = {
              ...args,
              imgUrl: uploadLinkResponse.data?.[0]?.url,
            };
          }
        }
        response = await this.guestService.conversationGroupAdd(args);
        break;
    }
    if (response) {
      this.commonService.openSnackBar(messageResult);
      let _conversation: any = {
        ...response,
        tempId: null,
        receiverId: null,
        avatarColor: this.commonService.randomColor('#FFFFFF'),
        messages: [],
        unreadCount: signal(0),
      };
      this.injector.get(Store).dispatch(new Push(_conversation));
      this.router.navigate(['/guest/chat']);
    }
  }
}
