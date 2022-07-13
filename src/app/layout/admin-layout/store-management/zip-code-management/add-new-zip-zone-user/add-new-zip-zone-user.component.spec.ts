import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewZipZoneUserComponent } from './add-new-zip-zone-user.component';

describe('AddNewZipZoneUserComponent', () => {
  let component: AddNewZipZoneUserComponent;
  let fixture: ComponentFixture<AddNewZipZoneUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewZipZoneUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewZipZoneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
