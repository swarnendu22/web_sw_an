import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AffiliateUserManagementComponent } from './affiliate-user-management.component';

describe('AffiliateUserManagementComponent', () => {
  let component: AffiliateUserManagementComponent;
  let fixture: ComponentFixture<AffiliateUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
