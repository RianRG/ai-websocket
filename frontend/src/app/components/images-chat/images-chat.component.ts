import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IImage } from 'src/app/interfaces/IImage';
import { IImageRequests } from 'src/app/interfaces/IImageRequests';
import { HttpService } from 'src/app/services/http.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images-chat',
  templateUrl: './images-chat.component.html',
  styleUrls: ['./images-chat.component.css']
})
export class ImagesChatComponent {
  imageForm!: FormGroup
  
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private http: HttpService
  ){
    
    this.http.getImages().subscribe((data: any) =>{
      console.log(data)
      this.images = data;
    })
    this.imageForm = this.fb.group({
      imageRequest: ['', Validators.required]
    })
  };
  onSubmit(){
    this.imagesService.sendMessage(this.imageForm.value.imageRequest)
    this.imageForm.reset();
    this.imageForm.disable();
  }
}
