import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererOrderVsEarningComponent } from './cell-renderer-order-vs-earning.component';

describe('CellRendererOrderVsEarningComponent', () => {
  let component: CellRendererOrderVsEarningComponent;
  let fixture: ComponentFixture<CellRendererOrderVsEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererOrderVsEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererOrderVsEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
