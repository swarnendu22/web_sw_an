import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePrivateProductsComponent } from './store-private-products.component';

describe('StorePrivateProductsComponent', () => {
  let component: StorePrivateProductsComponent;
  let fixture: ComponentFixture<StorePrivateProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePrivateProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePrivateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
