import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowCommissionManagementComponent } from './show-commission-management.component';

describe('ShowCommissionManagementComponent', () => {
  let component: ShowCommissionManagementComponent;
  let fixture: ComponentFixture<ShowCommissionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCommissionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
