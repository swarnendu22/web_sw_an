import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererIdentityVerificationComponent } from './cell-renderer-identity-verification.component';

describe('CellRendererIdentityVerificationComponent', () => {
  let component: CellRendererIdentityVerificationComponent;
  let fixture: ComponentFixture<CellRendererIdentityVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererIdentityVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererIdentityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
