import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AllZipcodeManagementComponent } from './all-zipcode-management.component';

describe('AllZipcodeManagementComponent', () => {
  let component: AllZipcodeManagementComponent;
  let fixture: ComponentFixture<AllZipcodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllZipcodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllZipcodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
