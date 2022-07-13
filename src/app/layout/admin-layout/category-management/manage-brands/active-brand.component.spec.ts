import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ActiveBrandComponent } from './active-brand.component';

describe('ActiveBrandComponent', () => {
  let component: ActiveBrandComponent;
  let fixture: ComponentFixture<ActiveBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
