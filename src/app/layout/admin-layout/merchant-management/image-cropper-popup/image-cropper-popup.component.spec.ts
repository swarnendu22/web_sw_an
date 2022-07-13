import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ImageCropperPopupComponent } from './image-cropper-popup.component';

describe('ImageCropperPopupComponent', () => {
  let component: ImageCropperPopupComponent;
  let fixture: ComponentFixture<ImageCropperPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropperPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropperPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
