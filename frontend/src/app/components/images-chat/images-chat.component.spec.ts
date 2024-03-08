import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesChatComponent } from './images-chat.component';

describe('ImagesChatComponent', () => {
  let component: ImagesChatComponent;
  let fixture: ComponentFixture<ImagesChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesChatComponent]
    });
    fixture = TestBed.createComponent(ImagesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
