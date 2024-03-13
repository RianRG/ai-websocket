import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images-chat',
  templateUrl: './images-chat.component.html',
  styleUrls: ['./images-chat.component.css']
})
export class ImagesChatComponent {
  @ViewChild('hr') hr!: ElementRef

  imageForm!: FormGroup
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private http: HttpService
  ){
    
    this.http.getImages().subscribe((data: any) =>{
      console.log(data);
      this.images = data;
    })
    this.imageForm = this.fb.group({
      imageRequest: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.imagesService.getMessages().subscribe(data =>{
      console.log(`data::: ${data}`)
      this.images.push({
        link: data,
      });
      this.imageForm.enable();
      if (this.hr && this.hr.nativeElement) {
        this.hr.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    })
  }

  onSubmit(){
    this.imageForm.disable();
    this.imagesService.sendMessage(this.imageForm.value.imageRequest)
    this.images.push({
      imageRequest: this.imageForm.value.imageRequest
    })
    
    this.imageForm.reset();
    if (this.hr && this.hr.nativeElement) {
      this.hr.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}
