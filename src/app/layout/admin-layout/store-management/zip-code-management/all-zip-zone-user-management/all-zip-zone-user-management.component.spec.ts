import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AllZipZoneUserManagementComponent } from './all-zip-zone-user-management.component';

describe('AllZipZoneUserManagementComponent', () => {
  let component: AllZipZoneUserManagementComponent;
  let fixture: ComponentFixture<AllZipZoneUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllZipZoneUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllZipZoneUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
