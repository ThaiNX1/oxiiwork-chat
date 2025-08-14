import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleNotificationService {
  private defaultTitle = 'Oxii Chat';
  private notificationTitle = '💬 Tin nhắn mới!';
  private blinkInterval: any;
  private unreadCount = 0;

  constructor(private titleService: Title) {}

  /** Cập nhật số lượng tin nhắn chưa đọc */
  updateUnreadCount(count: number) {
    this.unreadCount = count;
    this.titleService.setTitle(count > 0 ? `(${count}) 💬 Oxii Chat` : this.defaultTitle);
  }

  /** Hiệu ứng nhấp nháy title khi có tin nhắn mới */
  startBlinkingNotification() {
    let showNotification = false;
    if (this.blinkInterval) return; // Tránh tạo nhiều interval

    this.blinkInterval = setInterval(() => {
      this.titleService.setTitle(showNotification ? this.notificationTitle : this.defaultTitle);
      showNotification = !showNotification;
    }, 1000);
  }

  /** Dừng nhấp nháy khi người dùng mở chat */
  stopBlinkingNotification() {
    clearInterval(this.blinkInterval);
    this.blinkInterval = null;
    this.titleService.setTitle(this.defaultTitle);
  }
}