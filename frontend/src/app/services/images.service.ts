import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  websocket!: WebSocket;
  messages!: BehaviorSubject<string>;

  constructor() { 
    this.websocket = new WebSocket('ws://localhost:5000/chat/images')
    this.messages = new BehaviorSubject<string>('');
    this.websocket.onopen = () =>{
      console.log('runnin')
    }

    this.websocket.onmessage = (msg) =>{
      console.log(msg.data)
    }

    this.websocket.onclose = () =>{
      console.log('closed');
    }
  }

  sendMessage(msg: string){
    
  }
}
