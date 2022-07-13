import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreDeliverySettingsComponent } from './store-delivery-settings.component';

describe('StoreDeliverySettingsComponent', () => {
  let component: StoreDeliverySettingsComponent;
  let fixture: ComponentFixture<StoreDeliverySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDeliverySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDeliverySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
