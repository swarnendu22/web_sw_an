import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererProductAttributePopupComponent } from './cell-renderer-product-attribute-popup.component';

describe('CellRendererProductAttributePopupComponent', () => {
  let component: CellRendererProductAttributePopupComponent;
  let fixture: ComponentFixture<CellRendererProductAttributePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererProductAttributePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererProductAttributePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
