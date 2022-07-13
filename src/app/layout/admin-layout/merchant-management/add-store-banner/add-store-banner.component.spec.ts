import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddStoreBannerComponent } from './add-store-banner.component';

describe('AddStoreBannerComponent', () => {
  let component: AddStoreBannerComponent;
  let fixture: ComponentFixture<AddStoreBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
