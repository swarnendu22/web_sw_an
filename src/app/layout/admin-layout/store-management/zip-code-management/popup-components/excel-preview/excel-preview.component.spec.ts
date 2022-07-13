import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ExcelPreviewComponent } from './excel-preview.component';

describe('ExcelPreviewComponent', () => {
  let component: ExcelPreviewComponent;
  let fixture: ComponentFixture<ExcelPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
