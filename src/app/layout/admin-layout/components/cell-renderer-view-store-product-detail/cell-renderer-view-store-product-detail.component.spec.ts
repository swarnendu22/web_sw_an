import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererViewStoreProductDetailComponent } from './cell-renderer-view-store-product-detail.component';

describe('CellRendererViewStoreProductDetailComponent', () => {
  let component: CellRendererViewStoreProductDetailComponent;
  let fixture: ComponentFixture<CellRendererViewStoreProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererViewStoreProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererViewStoreProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
