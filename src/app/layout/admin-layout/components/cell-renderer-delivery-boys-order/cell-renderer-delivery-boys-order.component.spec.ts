import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererDeliveryBoysOrderComponent } from './cell-renderer-delivery-boys-order.component';

describe('CellRendererDeliveryBoysOrderComponent', () => {
  let component: CellRendererDeliveryBoysOrderComponent;
  let fixture: ComponentFixture<CellRendererDeliveryBoysOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererDeliveryBoysOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererDeliveryBoysOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
