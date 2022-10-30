import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket = new SockJS(`${environment.baseUrl.replace('/api/v1', '')}/notification`);
  stompClient = over(this.socket);

  constructor() {}

  subscribeNotification(topic: string, callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (event: any): any => {
      callback(event);
    });
  }
}
