import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { IdentityVerificationModalComponent } from './identity-verification-modal.component';

describe('IdentityVerificationModalComponent', () => {
  let component: IdentityVerificationModalComponent;
  let fixture: ComponentFixture<IdentityVerificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityVerificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityVerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
