import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreBannerListComponent } from './store-banner-list.component';

describe('StoreBannerListComponent', () => {
  let component: StoreBannerListComponent;
  let fixture: ComponentFixture<StoreBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
