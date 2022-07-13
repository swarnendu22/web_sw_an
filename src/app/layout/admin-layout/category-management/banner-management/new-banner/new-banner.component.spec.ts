import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewBannerComponent } from './new-banner.component';

describe('NewBannerComponent', () => {
  let component: NewBannerComponent;
  let fixture: ComponentFixture<NewBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
