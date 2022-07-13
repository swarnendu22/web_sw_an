import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererImagePreviewComponent } from './cell-renderer-image-preview.component';

describe('CellRendererImagePreviewComponent', () => {
  let component: CellRendererImagePreviewComponent;
  let fixture: ComponentFixture<CellRendererImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererImagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
