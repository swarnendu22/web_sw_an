import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewCommissionGroupComponent } from './add-new-commission-group.component';

describe('AddNewCommissionGroupComponent', () => {
  let component: AddNewCommissionGroupComponent;
  let fixture: ComponentFixture<AddNewCommissionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCommissionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCommissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
