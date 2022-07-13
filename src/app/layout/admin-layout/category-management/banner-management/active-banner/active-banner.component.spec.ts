import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ActiveBannerComponent } from './active-banner.component';

describe('ActiveBannerComponent', () => {
  let component: ActiveBannerComponent;
  let fixture: ComponentFixture<ActiveBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
