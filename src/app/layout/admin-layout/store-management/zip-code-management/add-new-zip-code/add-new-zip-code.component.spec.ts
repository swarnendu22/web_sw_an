import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewZipCodeComponent } from './add-new-zip-code.component';

describe('AddNewZipCodeComponent', () => {
  let component: AddNewZipCodeComponent;
  let fixture: ComponentFixture<AddNewZipCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewZipCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewZipCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
