import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingBrandComponent } from './pending-brand.component';

describe('PendingBrandComponent', () => {
  let component: PendingBrandComponent;
  let fixture: ComponentFixture<PendingBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
