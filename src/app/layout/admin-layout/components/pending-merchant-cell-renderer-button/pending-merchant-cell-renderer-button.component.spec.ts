import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingMerchantCellRendererButtonComponent } from './pending-merchant-cell-renderer-button.component';

describe('PendingMerchantCellRendererButtonComponent', () => {
  let component: PendingMerchantCellRendererButtonComponent;
  let fixture: ComponentFixture<PendingMerchantCellRendererButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingMerchantCellRendererButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingMerchantCellRendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
