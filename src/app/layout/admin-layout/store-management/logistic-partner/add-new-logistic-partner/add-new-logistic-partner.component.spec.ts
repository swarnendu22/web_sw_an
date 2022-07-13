import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewLogisticPartnerComponent } from './add-new-logistic-partner.component';

describe('AddNewLogisticPartnerComponent', () => {
  let component: AddNewLogisticPartnerComponent;
  let fixture: ComponentFixture<AddNewLogisticPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLogisticPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLogisticPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
