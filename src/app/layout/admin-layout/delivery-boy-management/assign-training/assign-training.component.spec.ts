import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AssignTrainingComponent } from './assign-training.component';

describe('AssignTrainingComponent', () => {
  let component: AssignTrainingComponent;
  let fixture: ComponentFixture<AssignTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
