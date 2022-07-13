import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RejectedMerchantsComponent } from './rejected-merchants.component';

describe('RejectedMerchantsComponent', () => {
  let component: RejectedMerchantsComponent;
  let fixture: ComponentFixture<RejectedMerchantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedMerchantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedMerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
