import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MentionUser } from './mention.types';

@Component({
  selector: 'app-mention-overlay',
  template: `
    <div class="mention-popup">
      <div class="item"
           *ngFor="let u of items; let i = index"
           [class.active]="i === activeIndex"
           (mousedown)="onPick(u)">
        <img *ngIf="u.avatarUrl" [src]="u.avatarUrl" alt="" />
        <span>{{ u.fullname }}</span>
      </div>
      <div class="empty" *ngIf="!items?.length">Không có kết quả</div>
    </div>
  `,
  styles: [`
    .mention-popup{background:#fff;border:1px solid #e5e7eb;border-radius:8px;
      box-shadow:0 6px 28px rgba(0,0,0,.12);min-width:220px;max-height:240px;overflow:auto}
    .item{display:flex;gap:8px;align-items:center;padding:8px 10px;cursor:pointer}
    .item.active,.item:hover{background:#eef2ff}
    img{width:24px;height:24px;border-radius:50%}
    .empty{padding:8px 10px;color:#9aa3af}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentionOverlayComponent {
  @Input() items: MentionUser[] = [];
  @Input() activeIndex = 0;
  @Output() pickUser = new EventEmitter<MentionUser>();
  onPick(u: MentionUser) { this.pickUser.emit(u); }
}
