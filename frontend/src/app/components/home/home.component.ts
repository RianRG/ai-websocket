import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IText } from 'src/app/interfaces/IText';
import { HttpService } from 'src/app/services/http.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  form!: FormGroup;
  messages: IText[] = [];
  constructor(
    private fb: FormBuilder,
    private websocket: WebsocketService,
    private http: HttpService
  ){

    this.http.getTexts().subscribe((data: IText[]) =>{
      this.messages = data;
    })

    this.form = this.fb.group({
      content: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.websocket.getMessages().subscribe((data: string) =>{
      this.messages.push({
        content: data,
        sender: 'Assistent'
      })
      this.form.enable();
    })
  }

  onSubmit(){
    this.form.disable()
    this.websocket.sendMessage(this.form.value.content);
    this.messages.push({
      content: this.form.value.content,
      sender: 'User'
    });
    this.form.reset();
  }
}
