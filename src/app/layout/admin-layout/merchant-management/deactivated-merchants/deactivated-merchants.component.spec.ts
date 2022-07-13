import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedMerchantsComponent } from './deactivated-merchants.component';

describe('DeactivatedMerchantsComponent', () => {
  let component: DeactivatedMerchantsComponent;
  let fixture: ComponentFixture<DeactivatedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
