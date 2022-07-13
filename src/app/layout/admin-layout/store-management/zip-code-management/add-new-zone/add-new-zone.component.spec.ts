import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewZoneComponent } from './add-new-zone.component';

describe('AddNewZoneComponent', () => {
  let component: AddNewZoneComponent;
  let fixture: ComponentFixture<AddNewZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
