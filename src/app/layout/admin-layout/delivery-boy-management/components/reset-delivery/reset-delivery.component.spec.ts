import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ResetDeliveryComponent } from './reset-delivery.component';

describe('ResetDeliveryComponent', () => {
  let component: ResetDeliveryComponent;
  let fixture: ComponentFixture<ResetDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
