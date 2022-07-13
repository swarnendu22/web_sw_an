import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CellRendererSellerSettlementComponent } from './cell-renderer-seller-settlement.component';

describe('CellRendererSellerSettlementComponent', () => {
  let component: CellRendererSellerSettlementComponent;
  let fixture: ComponentFixture<CellRendererSellerSettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererSellerSettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererSellerSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
