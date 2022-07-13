import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ProductExceptionComponent } from './product-exception.component';

describe('ProductExceptionComponent', () => {
  let component: ProductExceptionComponent;
  let fixture: ComponentFixture<ProductExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
