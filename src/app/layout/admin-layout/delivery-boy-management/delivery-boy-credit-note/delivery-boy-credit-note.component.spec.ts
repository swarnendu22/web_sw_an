import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryBoyCreditNoteComponent } from './delivery-boy-credit-note.component';

describe('DeliveryBoyCreditNoteComponent', () => {
  let component: DeliveryBoyCreditNoteComponent;
  let fixture: ComponentFixture<DeliveryBoyCreditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBoyCreditNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBoyCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
