import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInventoryPricingComponent } from './bulk-inventory-pricing.component';

describe('BulkInventoryPricingComponent', () => {
  let component: BulkInventoryPricingComponent;
  let fixture: ComponentFixture<BulkInventoryPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkInventoryPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkInventoryPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
