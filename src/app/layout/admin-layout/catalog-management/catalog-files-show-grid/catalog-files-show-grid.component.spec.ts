import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CatalogFilesShowGridComponent } from './catalog-files-show-grid.component';

describe('CatalogFilesShowGridComponent', () => {
  let component: CatalogFilesShowGridComponent;
  let fixture: ComponentFixture<CatalogFilesShowGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFilesShowGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFilesShowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
