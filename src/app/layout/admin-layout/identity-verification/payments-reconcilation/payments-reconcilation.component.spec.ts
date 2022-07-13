import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsReconcilationComponent } from './payments-reconcilation.component';

describe('PaymentsReconcilationComponent', () => {
  let component: PaymentsReconcilationComponent;
  let fixture: ComponentFixture<PaymentsReconcilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsReconcilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsReconcilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
