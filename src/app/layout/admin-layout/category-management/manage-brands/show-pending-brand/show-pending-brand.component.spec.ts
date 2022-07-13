import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowPendingBrandComponent } from './show-pending-brand.component';

describe('InActiveBrandComponent', () => {
  let component: ShowPendingBrandComponent;
  let fixture: ComponentFixture<ShowPendingBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPendingBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPendingBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
