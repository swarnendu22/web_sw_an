import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewfulfillmentCenterComponent } from './add-newfulfillment-center.component';

describe('AddNewfulfillmentCenterComponent', () => {
  let component: AddNewfulfillmentCenterComponent;
  let fixture: ComponentFixture<AddNewfulfillmentCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewfulfillmentCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewfulfillmentCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
