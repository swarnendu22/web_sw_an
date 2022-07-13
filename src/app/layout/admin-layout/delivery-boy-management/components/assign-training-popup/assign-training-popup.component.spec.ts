import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AssignTrainingPopupComponent } from './assign-training-popup.component';

describe('AssignTrainingPopupComponent', () => {
  let component: AssignTrainingPopupComponent;
  let fixture: ComponentFixture<AssignTrainingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTrainingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTrainingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
