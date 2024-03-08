import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images-chat',
  templateUrl: './images-chat.component.html',
  styleUrls: ['./images-chat.component.css']
})
export class ImagesChatComponent {
  imageForm!: FormGroup
  constructor(
    private images: ImagesService,
    private fb: FormBuilder
  ){
    this.imageForm = this.fb.group({
      imageRequest: ['', Validators.required]
    })
  };

  onSubmit(){
    
  }
}
