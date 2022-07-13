import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRenderStoreTypeComponent } from './cell-render-store-type.component';

describe('CellRenderStoreTypeComponent', () => {
  let component: CellRenderStoreTypeComponent;
  let fixture: ComponentFixture<CellRenderStoreTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRenderStoreTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRenderStoreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
