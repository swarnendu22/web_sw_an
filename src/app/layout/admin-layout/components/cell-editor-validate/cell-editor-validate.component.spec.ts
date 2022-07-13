import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellEditorValidateComponent } from './cell-editor-validate.component';

describe('CellEditorValidateComponent', () => {
  let component: CellEditorValidateComponent;
  let fixture: ComponentFixture<CellEditorValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditorValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditorValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
