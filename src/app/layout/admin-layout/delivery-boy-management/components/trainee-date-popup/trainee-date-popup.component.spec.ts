import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TraineeDatePopupComponent } from './trainee-date-popup.component';

describe('TraineeDatePopupComponent', () => {
  let component: TraineeDatePopupComponent;
  let fixture: ComponentFixture<TraineeDatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeDatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
