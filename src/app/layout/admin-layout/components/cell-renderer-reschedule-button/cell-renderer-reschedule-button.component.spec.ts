import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererRescheduleButtonComponent } from './cell-renderer-reschedule-button.component';

describe('CellRendererRescheduleButtonComponent', () => {
  let component: CellRendererRescheduleButtonComponent;
  let fixture: ComponentFixture<CellRendererRescheduleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererRescheduleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererRescheduleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
