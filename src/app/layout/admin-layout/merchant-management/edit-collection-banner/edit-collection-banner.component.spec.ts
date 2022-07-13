import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionBannerComponent } from './edit-collection-banner.component';

describe('EditCollectionBannerComponent', () => {
  let component: EditCollectionBannerComponent;
  let fixture: ComponentFixture<EditCollectionBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCollectionBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
