import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingCommissionComponent } from './pending-commission.component';

describe('PendingCommissionComponent', () => {
  let component: PendingCommissionComponent;
  let fixture: ComponentFixture<PendingCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
