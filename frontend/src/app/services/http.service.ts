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
    return this.http.get<IText[]>('http://localhost:5000/texts');
  }

  getImages(){
    return this.http.get('http://localhost:5000/images');
  }

  getImageRequests(){
    return this.http.get('http://localhost:5000/image-requests');
  }
}
