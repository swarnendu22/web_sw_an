import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowStoreDetailsTabComponent } from './show-store-details-tab.component';

describe('ShowStoreDetailsTabComponent', () => {
  let component: ShowStoreDetailsTabComponent;
  let fixture: ComponentFixture<ShowStoreDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoreDetailsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoreDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
