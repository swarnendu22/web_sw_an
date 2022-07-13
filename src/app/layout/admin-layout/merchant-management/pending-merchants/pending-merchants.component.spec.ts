import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingMerchantsComponent } from './pending-merchants.component';

describe('PendingMerchantsComponent', () => {
  let component: PendingMerchantsComponent;
  let fixture: ComponentFixture<PendingMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
