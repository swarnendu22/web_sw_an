import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageCropComponent } from './product-image-crop.component';

describe('ProductImageCropComponent', () => {
  let component: ProductImageCropComponent;
  let fixture: ComponentFixture<ProductImageCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
