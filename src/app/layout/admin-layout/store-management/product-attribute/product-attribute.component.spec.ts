import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ProductAttributeComponent } from './product-attribute.component';

describe('ProductAttributeComponent', () => {
  let component: ProductAttributeComponent;
  let fixture: ComponentFixture<ProductAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
