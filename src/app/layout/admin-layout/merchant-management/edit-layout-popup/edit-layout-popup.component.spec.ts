import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditLayoutPopupComponent } from './edit-layout-popup.component';

describe('EditLayoutPopupComponent', () => {
  let component: EditLayoutPopupComponent;
  let fixture: ComponentFixture<EditLayoutPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLayoutPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayoutPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
