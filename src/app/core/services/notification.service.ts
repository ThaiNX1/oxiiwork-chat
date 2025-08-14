import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
    // this.requestPermission();
  }

  /** Yêu cầu quyền gửi thông báo */
  requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Thông báo được phép!');
      } else {
        console.log('Người dùng từ chối thông báo.');
      }
    });
  }

  /** Hiển thị thông báo khi có tin nhắn mới */
  showNotification(title: string, message: string, conversationId: string) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: message,
        icon: 'assets/images/favicon.png'
      });
  
      /** Bắt sự kiện khi user click vào thông báo */
      notification.onclick = () => {
        window.focus(); // Đưa tab về foreground
        window.location.href = '/guest/chat?conversationId=' + conversationId; // Chuyển đến trang chat
      };
    }
  }
}