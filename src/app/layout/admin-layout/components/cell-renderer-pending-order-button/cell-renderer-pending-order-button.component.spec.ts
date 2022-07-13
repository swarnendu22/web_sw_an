import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererPendingOrderButtonComponent } from './cell-renderer-pending-order-button.component';

describe('CellRendererPendingOrderButtonComponent', () => {
  let component: CellRendererPendingOrderButtonComponent;
  let fixture: ComponentFixture<CellRendererPendingOrderButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererPendingOrderButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererPendingOrderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
