import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IText } from '../interfaces/IText';
import { IImage } from '../interfaces/IImage';
import { IImageRequests } from '../interfaces/IImageRequests';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getTexts(): Observable<IText[]>{
    return this.http.get<IText[]>('http://localhost:5000/texts');
  }

  getImages(){
    return this.http.get('http://localhost:5000/images');
  }

  getImageRequests(): Observable<IImageRequests[]>{
    return this.http.get<IImageRequests[]>('http://localhost:5000/image-requests');
  }
}
