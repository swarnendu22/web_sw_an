import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionBannerComponent } from './add-collection-banner.component';

describe('AddCollectionBannerComponent', () => {
  let component: AddCollectionBannerComponent;
  let fixture: ComponentFixture<AddCollectionBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollectionBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
