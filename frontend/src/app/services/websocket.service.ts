import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  websocket!: WebSocket;
  messages!: BehaviorSubject<string>;

  constructor() { 
    this.websocket = new WebSocket('http://localhost:5000/chat')
    this.messages = new BehaviorSubject<string>('');
    this.websocket.onopen = () =>{
      console.log('runnin')
    }

    this.websocket.onmessage = (msg) =>{
      console.log(msg.data)
      this.messages.next(msg.data);
    }

    this.websocket.onclose = () =>{
      console.log('closed');
    }
  }
}
