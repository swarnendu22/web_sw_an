import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyMerchandiseComponent } from './delivery-boy-merchandise.component';

describe('DeliveryBoyMerchandiseComponent', () => {
  let component: DeliveryBoyMerchandiseComponent;
  let fixture: ComponentFixture<DeliveryBoyMerchandiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyMerchandiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
