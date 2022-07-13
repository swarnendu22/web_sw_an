import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddComplianceFormComponent } from './add-compliance-form.component';

describe('AddComplianceFormComponent', () => {
  let component: AddComplianceFormComponent;
  let fixture: ComponentFixture<AddComplianceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplianceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplianceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
