import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StorePendingProductsComponent } from './store-pending-products.component';

describe('StorePendingProductsComponent', () => {
  let component: StorePendingProductsComponent;
  let fixture: ComponentFixture<StorePendingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
