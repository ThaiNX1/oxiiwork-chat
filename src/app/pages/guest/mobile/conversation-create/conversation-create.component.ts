import { Component, inject, signal } from '@angular/core';
import { BaseGuestClass } from '../../../../commons/base-guest.class';
import { GuestService } from '../../guest.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ChatConversationType } from '../../../../commons/types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conversation-create',
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.scss'
})
export class ConversationCreateComponent extends BaseGuestClass {
  protected readonly ChatConversationType = ChatConversationType;
  protected searchUsers = signal<any[]>([]);
  protected showFilterForm = signal(false);
  protected routerParameterType = signal<string | null>(null);
  protected newConversationInfo = signal<any>(null);

  /** Service */
  private readonly guestService = inject(GuestService);
  private readonly activatedRoute = inject(ActivatedRoute);
  // private readonly router = inject(Router);

  constructor(
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      keyword: new FormControl(null)
    });
    this.onBaseInit();
    this.onValueChange();
  }

  private onBaseInit(): void {
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.routerParameterType.set(param?.type ?? null);
      switch (param?.type) {
        case ChatConversationType.Direct:
          this.newConversationInfo.set({
            name: 'Trò truyện mới',
            type: param?.type
          });
          break;
        case ChatConversationType.Group:
          this.newConversationInfo.set({
            name: 'Tạo nhóm chat',
            type: param?.type
          });
          break;
      }
      console.log('newConversationInfo', this.newConversationInfo());
    });
  }

  private onValueChange(): void {
    this.filterForm.controls['keyword'].valueChanges.pipe(debounceTime(300)).subscribe(async (value) => {
      if (value) {
        // await this.onSearchUser(ChatConversationType.Direct)
        const response = await this.guestService.conversationGetUserList({
          keyword: value,
          page: 0,
          size: 20
        });
        this.searchUsers.set(response?.officeUsers || []);
      } else {
        this.searchUsers.set([]);
      }
    });
  }

  protected onCreateConversation(user: any, type: ChatConversationType): void {
    switch (type) {
      case ChatConversationType.Direct:
        void this.router.navigate(['chat'], {
          queryParams: {
            receiverId: user.id
          }
        });
        break;
      case ChatConversationType.Group:
        break;
    }
  }
}
