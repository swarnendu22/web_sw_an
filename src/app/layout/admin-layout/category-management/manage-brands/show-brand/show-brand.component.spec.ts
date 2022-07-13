import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowBrandComponent } from './show-brand.component';

describe('InActiveBrandComponent', () => {
  let component: ShowBrandComponent;
  let fixture: ComponentFixture<ShowBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
