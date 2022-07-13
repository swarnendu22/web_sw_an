import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DialogLatLongComponent } from './dialog-lat-long.component';

describe('DialogLatLongComponent', () => {
  let component: DialogLatLongComponent;
  let fixture: ComponentFixture<DialogLatLongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLatLongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLatLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
