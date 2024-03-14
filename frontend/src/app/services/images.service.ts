import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  websocket!: WebSocket;
  messages!: BehaviorSubject<string>;

  constructor() { 
    this.websocket = new WebSocket('wss://ai-websocket.onrender.com/chat/images')
    this.messages = new BehaviorSubject<string>('');
    this.websocket.onopen = () =>{
      console.log('runnin')
    }

    this.websocket.onmessage = (msg) =>{
      console.log(msg)
      this.messages.next(msg.data)
    }

    this.websocket.onclose = () =>{
      console.log('closed');
    }
  }

  sendMessage(msg: string){
    this.websocket.send(msg);
  }

  getMessages(){
    return this.messages.asObservable();
  }
}
