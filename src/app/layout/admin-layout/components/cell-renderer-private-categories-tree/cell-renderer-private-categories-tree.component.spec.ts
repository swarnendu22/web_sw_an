import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererPrivateCategoriesTreeComponent } from './cell-renderer-private-categories-tree.component';

describe('CellRendererPrivateCategoriesTreeComponent', () => {
  let component: CellRendererPrivateCategoriesTreeComponent;
  let fixture: ComponentFixture<CellRendererPrivateCategoriesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererPrivateCategoriesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererPrivateCategoriesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
