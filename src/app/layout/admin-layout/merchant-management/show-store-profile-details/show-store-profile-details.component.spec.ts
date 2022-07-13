import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowStoreProfileDetailsComponent } from './show-store-profile-details.component';

describe('ShowStoreProfileDetailsComponent', () => {
  let component: ShowStoreProfileDetailsComponent;
  let fixture: ComponentFixture<ShowStoreProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoreProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoreProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
