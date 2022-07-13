import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DriverDocumentViewComponent } from './driver-document-view.component';

describe('DriverDocumentViewComponent', () => {
  let component: DriverDocumentViewComponent;
  let fixture: ComponentFixture<DriverDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
