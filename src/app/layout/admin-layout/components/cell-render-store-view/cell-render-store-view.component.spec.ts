import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRenderStoreViewComponent } from './cell-render-store-view.component';

describe('CellRenderStoreViewComponent', () => {
  let component: CellRenderStoreViewComponent;
  let fixture: ComponentFixture<CellRenderStoreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRenderStoreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRenderStoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
