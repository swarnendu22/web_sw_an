import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererSettlementDetailsComponent } from './cell-renderer-settlement-details.component';

describe('CellRendererSettlementDetailsComponent', () => {
  let component: CellRendererSettlementDetailsComponent;
  let fixture: ComponentFixture<CellRendererSettlementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererSettlementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererSettlementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
