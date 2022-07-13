import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererImageHoverPreviewComponent } from './cell-renderer-image-hover-preview.component';

describe('CellRendererImageHoverPreviewComponent', () => {
  let component: CellRendererImageHoverPreviewComponent;
  let fixture: ComponentFixture<CellRendererImageHoverPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererImageHoverPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererImageHoverPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
