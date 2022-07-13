import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionBannerListComponent } from './collection-banner-list.component';

describe('CollectionBannerListComponent', () => {
  let component: CollectionBannerListComponent;
  let fixture: ComponentFixture<CollectionBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
