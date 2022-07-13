import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterToStoreProductPopupComponent } from './master-to-store-product-popup.component';

describe('MasterToStoreProductPopupComponent', () => {
  let component: MasterToStoreProductPopupComponent;
  let fixture: ComponentFixture<MasterToStoreProductPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterToStoreProductPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterToStoreProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
