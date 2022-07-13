import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSettlementDetailListComponent } from './seller-settlement-detail-list.component';

describe('SellerSettlementDetailListComponent', () => {
  let component: SellerSettlementDetailListComponent;
  let fixture: ComponentFixture<SellerSettlementDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSettlementDetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSettlementDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
