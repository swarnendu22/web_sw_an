import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewDeliveryCenterComponent } from './add-new-delivery-center.component';

describe('AddNewDeliveryCenterComponent', () => {
  let component: AddNewDeliveryCenterComponent;
  let fixture: ComponentFixture<AddNewDeliveryCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDeliveryCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDeliveryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
