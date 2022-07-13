import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CatalogFilesShowProductComponent } from './catalog-files-show-product.component';

describe('CatalogFilesShowProductComponent', () => {
  let component: CatalogFilesShowProductComponent;
  let fixture: ComponentFixture<CatalogFilesShowProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFilesShowProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFilesShowProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
