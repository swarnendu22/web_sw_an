import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CatalogFilesComponent } from './catalog-files.component';

describe('CatalogFilesComponent', () => {
  let component: CatalogFilesComponent;
  let fixture: ComponentFixture<CatalogFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
