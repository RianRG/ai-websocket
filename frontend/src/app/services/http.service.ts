import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IText } from '../interfaces/IText';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getTexts(): Observable<IText[]>{
    return this.http.get<IText[]>('https://ai-websocket.onrender.com/texts', { withCredentials: true });
  }

  getImages(){
    return this.http.get('https://ai-websocket.onrender.com/images', { withCredentials: true });
  }

  getImageRequests(){
    return this.http.get('https://ai-websocket.onrender.com/image-requests', { withCredentials: true });
  }
}
