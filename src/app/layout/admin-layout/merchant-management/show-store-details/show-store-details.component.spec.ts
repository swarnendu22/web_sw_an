import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowStoreDetailsComponent } from './show-store-details.component';

describe('ShowStoreDetailsComponent', () => {
  let component: ShowStoreDetailsComponent;
  let fixture: ComponentFixture<ShowStoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
