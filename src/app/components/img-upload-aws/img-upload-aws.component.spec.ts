import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ImgUploadAwsComponent } from './img-upload-aws.component';

describe('ImgUploadAwsComponent', () => {
  let component: ImgUploadAwsComponent;
  let fixture: ComponentFixture<ImgUploadAwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgUploadAwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgUploadAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
