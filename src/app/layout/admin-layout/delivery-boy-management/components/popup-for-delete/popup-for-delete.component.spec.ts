import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PopupForDeleteComponent } from './popup-for-delete.component';

describe('PopupForDeleteComponent', () => {
  let component: PopupForDeleteComponent;
  let fixture: ComponentFixture<PopupForDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupForDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupForDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
