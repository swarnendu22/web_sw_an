import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewCommissionExceptionComponent } from './add-new-commission-exception.component';

describe('AddNewCommissionExceptionComponent', () => {
  let component: AddNewCommissionExceptionComponent;
  let fixture: ComponentFixture<AddNewCommissionExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCommissionExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCommissionExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
