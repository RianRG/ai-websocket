import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IText } from 'src/app/interfaces/IText';
import { HttpService } from 'src/app/services/http.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  @ViewChild('hr') hr!: ElementRef

  form!: FormGroup;
  messages: IText[] = [];
  constructor(
    private fb: FormBuilder,
    private websocket: ChatService,
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
      if (this.hr && this.hr.nativeElement) {
        this.hr.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
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
    if (this.hr && this.hr.nativeElement) {
      this.hr.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}
