import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererCatalogPendingBulkrejectComponent } from './cell-renderer-catalog-pending-bulkreject.component';

describe('CellRendererCatalogPendingBulkrejectComponent', () => {
  let component: CellRendererCatalogPendingBulkrejectComponent;
  let fixture: ComponentFixture<CellRendererCatalogPendingBulkrejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererCatalogPendingBulkrejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererCatalogPendingBulkrejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
