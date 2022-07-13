import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PopupDeMerchandiseComponent } from './popup-de-merchandise.component';

describe('PopupDeMerchandiseComponent', () => {
  let component: PopupDeMerchandiseComponent;
  let fixture: ComponentFixture<PopupDeMerchandiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDeMerchandiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeMerchandiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
