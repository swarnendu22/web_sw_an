import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewCountryComponent } from './add-new-country.component';

describe('AddNewCountryComponent', () => {
  let component: AddNewCountryComponent;
  let fixture: ComponentFixture<AddNewCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
