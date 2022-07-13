import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProductFilterPopupComponent } from './product-filter-popup.component';

describe('ProductFilterPopupComponent', () => {
  let component: ProductFilterPopupComponent;
  let fixture: ComponentFixture<ProductFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
