import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererCategoryViewButtonComponent } from './cell-renderer-category-view-button.component';

describe('CellRendererCategoryViewButtonComponent', () => {
  let component: CellRendererCategoryViewButtonComponent;
  let fixture: ComponentFixture<CellRendererCategoryViewButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererCategoryViewButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererCategoryViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
