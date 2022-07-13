import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreFilterPopupComponent } from './store-filter-popup.component';

describe('StoreFilterPopupComponent', () => {
  let component: StoreFilterPopupComponent;
  let fixture: ComponentFixture<StoreFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreFilterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
