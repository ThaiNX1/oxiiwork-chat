import {io, Socket} from "socket.io-client";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {storageKey} from "../constants/storage-key";

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket!: Socket;

  constructor() {
    // Initialize the Socket.IO connection
    // this.socket = io(environment.socketUri, {
    //   // transports: ['websocket'], // Use WebSocket transport
    //   extraHeaders:{
    //     'Authorization': `Bearer ${localStorage.getItem(storageKey.token)}`
    //   }
    // });
  }

  // Emit an event to the server
  connect(): void {
    this.socket = io(environment.socketUri, {
      transports: ['websocket'], // Use WebSocket transport
      query: {
        token: localStorage.getItem(storageKey.token), // fallback cho websocket
      },
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem(storageKey.token)}`, // dùng cho polling
      },
      // auth: {
      //   token: `Bearer ${localStorage.getItem(storageKey.token)}`
      // }
    });
    this.socket.on('connect_error', (error) => {
      console.error('Chi tiết lỗi kết nối:', error);
    });
  }

  // Emit an event to the server
  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  hasListener(event: string): boolean {
    return this.socket.hasListeners(event);
  }

  // Listen for an event from the server
  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Remove a specific event listener
  off(event: string): void {
    this.socket.off(event);
  }

  // Disconnect the socket
  disconnect(): void {
    this.socket.disconnect();
  }

  // Reconnect the socket
  reconnect(): void {
    this.socket.connect();
  }
}
