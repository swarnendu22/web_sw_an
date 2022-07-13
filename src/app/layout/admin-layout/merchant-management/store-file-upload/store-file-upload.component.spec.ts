import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreFileUploadComponent } from './store-file-upload.component';

describe('StoreFileUploadComponent', () => {
  let component: StoreFileUploadComponent;
  let fixture: ComponentFixture<StoreFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
