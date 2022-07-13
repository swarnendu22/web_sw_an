import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CommissionManagementComponent } from './commission-management.component';

describe('CommissionManagementComponent', () => {
  let component: CommissionManagementComponent;
  let fixture: ComponentFixture<CommissionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
