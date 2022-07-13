import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewAppVersionComponent } from './add-new-app-version.component';

describe('AddNewAppVersionComponent', () => {
  let component: AddNewAppVersionComponent;
  let fixture: ComponentFixture<AddNewAppVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAppVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAppVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
