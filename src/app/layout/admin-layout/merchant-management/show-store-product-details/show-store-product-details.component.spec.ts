import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowStoreProductDetailsComponent } from './show-store-product-details.component';

describe('ShowStoreProductDetailsComponent', () => {
  let component: ShowStoreProductDetailsComponent;
  let fixture: ComponentFixture<ShowStoreProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoreProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoreProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
