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
  fileLink!: string
  constructor(
    private images: ImagesService,
    private fb: FormBuilder
  ){
    this.imageForm = this.fb.group({
      imageRequest: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.images.getMessage().subscribe(data =>{
      this.fileLink = data;
    })
  }

  onSubmit(){
    this.images.sendMessage(this.imageForm.value.imageRequest)
    this.imageForm.reset();
  }
}
