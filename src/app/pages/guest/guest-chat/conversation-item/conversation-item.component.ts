import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ChatMessageType, ChatConversationType } from '../../../../commons/types';
import { MessageViewType, MessageRole } from '../guest-chat.component';
import { DomSanitizer } from '@angular/platform-browser';
import { compareAsc, format } from 'date-fns';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrl: './conversation-item.component.scss'
})
export class ConversationItemComponent {
  _item: any;
  @Input() set item(item: any) {
    let _item = {
      ...item,
    };
    if (item?.lastMessageAt && 
        format(new Date(item?.lastMessageAt), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy')) {
      _item = {
        ...item,
        isToday: true
      }
    }
    this._item = _item;
  }
  @Input() conversationSelected: any;
  @Output() onSelectConversation = new EventEmitter();
  MessageViewType = { ...MessageViewType, ...ChatMessageType };
  MessageRole = MessageRole;
  ChatMessageType = ChatMessageType;
  ChatConversationType = ChatConversationType;

  sanitizer = inject(DomSanitizer);
}
