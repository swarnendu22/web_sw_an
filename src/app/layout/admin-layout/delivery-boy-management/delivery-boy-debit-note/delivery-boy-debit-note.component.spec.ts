import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyDebitNoteComponent } from './delivery-boy-debit-note.component';

describe('DeliveryBoyDebitNoteComponent', () => {
  let component: DeliveryBoyDebitNoteComponent;
  let fixture: ComponentFixture<DeliveryBoyDebitNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyDebitNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyDebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
