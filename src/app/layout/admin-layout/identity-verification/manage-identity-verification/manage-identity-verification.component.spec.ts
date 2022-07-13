import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageIdentityVerificationComponent } from './manage-identity-verification.component';

describe('ManageIdentityVerificationComponent', () => {
  let component: ManageIdentityVerificationComponent;
  let fixture: ComponentFixture<ManageIdentityVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIdentityVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIdentityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
