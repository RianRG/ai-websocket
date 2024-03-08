import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  form!: FormGroup;
  messages: string[] = [];
  constructor(
    private fb: FormBuilder,
    private websocket: WebsocketService
  ){
    this.form = this.fb.group({
      content: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.websocket.getMessages().subscribe((data: string) =>{
      this.messages.push(data)
    })
  }

  onSubmit(){
    this.websocket.sendMessage(this.form.value.content);
    this.form.reset();
  }
}
