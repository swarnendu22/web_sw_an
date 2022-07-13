import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreMediaComponent } from './store-media.component';

describe('StoreMediaComponent', () => {
  let component: StoreMediaComponent;
  let fixture: ComponentFixture<StoreMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
