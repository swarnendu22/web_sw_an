import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererBulkStoreActionButtonComponent } from './cell-renderer-bulk-store-action-button.component';

describe('CellRendererBulkStoreActionButtonComponent', () => {
  let component: CellRendererBulkStoreActionButtonComponent;
  let fixture: ComponentFixture<CellRendererBulkStoreActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererBulkStoreActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererBulkStoreActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
