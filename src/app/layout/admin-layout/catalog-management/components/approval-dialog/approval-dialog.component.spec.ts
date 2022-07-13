import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApprovalDialogComponent } from './approval-dialog.component';

describe('ApprovalDialogComponent', () => {
  let component: ApprovalDialogComponent;
  let fixture: ComponentFixture<ApprovalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
