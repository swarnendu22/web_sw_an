import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowStoreBannerComponent } from './show-store-banner.component';

describe('ShowStoreBannerComponent', () => {
  let component: ShowStoreBannerComponent;
  let fixture: ComponentFixture<ShowStoreBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoreBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoreBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
