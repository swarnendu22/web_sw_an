import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRenderCheckboxComponent } from './cell-render-checkbox.component';

describe('CellRenderCheckboxComponent', () => {
  let component: CellRenderCheckboxComponent;
  let fixture: ComponentFixture<CellRenderCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRenderCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRenderCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
