import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFilterComponent } from './store-product-filter.component';

describe('StoreProductFilterComponent', () => {
  let component: StoreProductFilterComponent;
  let fixture: ComponentFixture<StoreProductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProductFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
