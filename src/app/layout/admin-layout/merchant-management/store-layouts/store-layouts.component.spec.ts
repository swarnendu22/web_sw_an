import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreLayoutsComponent } from './store-layouts.component';

describe('StoreLayoutsComponent', () => {
  let component: StoreLayoutsComponent;
  let fixture: ComponentFixture<StoreLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
