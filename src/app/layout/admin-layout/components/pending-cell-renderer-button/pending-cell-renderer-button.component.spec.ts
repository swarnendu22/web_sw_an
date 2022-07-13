import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingCellRendererButtonComponent } from './pending-cell-renderer-button.component';

describe('CellRendererButtonComponent', () => {
  let component: PendingCellRendererButtonComponent;
  let fixture: ComponentFixture<PendingCellRendererButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCellRendererButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCellRendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
