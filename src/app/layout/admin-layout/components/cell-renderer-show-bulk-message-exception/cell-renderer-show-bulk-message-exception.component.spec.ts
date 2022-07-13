import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererShowBulkMessageExceptionComponent } from './cell-renderer-show-bulk-message-exception.component';

describe('CellRendererShowBulkMessageExceptionComponent', () => {
  let component: CellRendererShowBulkMessageExceptionComponent;
  let fixture: ComponentFixture<CellRendererShowBulkMessageExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererShowBulkMessageExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererShowBulkMessageExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
