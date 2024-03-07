import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  form!: FormGroup;
  constructor(
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      content: ['', Validators.required]
    })
  };

  onSubmit(){
    console.log(this.form.value.content);
  }
}
