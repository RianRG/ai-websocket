import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IText } from '../interfaces/IText';
import { IImage } from '../interfaces/IImage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getTexts(): Observable<IText[]>{
    return this.http.get<IText[]>('http://localhost:5000/texts');
  }

  getImages(): Observable<IImage[]>{
    return this.http.get<IImage[]>('http://localhost:5000/images');
  }
}
