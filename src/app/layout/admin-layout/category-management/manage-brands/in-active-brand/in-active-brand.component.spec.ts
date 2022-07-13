import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { InActiveBrandComponent } from './in-active-brand.component';

describe('InActiveBrandComponent', () => {
  let component: InActiveBrandComponent;
  let fixture: ComponentFixture<InActiveBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InActiveBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InActiveBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
