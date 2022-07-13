import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StorePromotionalComponent } from './store-promotional.component';

describe('StorePromotionalComponent', () => {
  let component: StorePromotionalComponent;
  let fixture: ComponentFixture<StorePromotionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePromotionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePromotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
