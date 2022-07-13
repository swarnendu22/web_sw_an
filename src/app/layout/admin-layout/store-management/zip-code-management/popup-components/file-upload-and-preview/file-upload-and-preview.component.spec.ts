import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FileUploadAndPreviewComponent } from './file-upload-and-preview.component';

describe('FileUploadAndPreviewComponent', () => {
  let component: FileUploadAndPreviewComponent;
  let fixture: ComponentFixture<FileUploadAndPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadAndPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadAndPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
