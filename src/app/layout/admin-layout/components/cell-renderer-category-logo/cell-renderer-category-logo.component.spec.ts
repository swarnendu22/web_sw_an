import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRendererCategoryLogoComponent } from './cell-renderer-category-logo.component';

describe('CellRendererCategoryLogoComponent', () => {
  let component: CellRendererCategoryLogoComponent;
  let fixture: ComponentFixture<CellRendererCategoryLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererCategoryLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererCategoryLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
