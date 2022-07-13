import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CommissionExceptionComponent } from './commission-exception.component';

describe('CommissionExceptionComponent', () => {
  let component: CommissionExceptionComponent;
  let fixture: ComponentFixture<CommissionExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
