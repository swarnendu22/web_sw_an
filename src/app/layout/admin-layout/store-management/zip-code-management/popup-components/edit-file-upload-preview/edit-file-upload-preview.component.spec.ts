import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditFileUploadPreviewComponent } from './edit-file-upload-preview.component';

describe('EditFileUploadPreviewComponent', () => {
  let component: EditFileUploadPreviewComponent;
  let fixture: ComponentFixture<EditFileUploadPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFileUploadPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFileUploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
