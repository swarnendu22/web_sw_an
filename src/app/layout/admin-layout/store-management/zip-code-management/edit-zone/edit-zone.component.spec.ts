import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditZoneComponent } from './edit-zone.component';

describe('EditZoneComponent', () => {
  let component: EditZoneComponent;
  let fixture: ComponentFixture<EditZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
