import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SelectCellRendererComponent } from './select-cell-renderer.component';

describe('SelectCellRendererComponent', () => {
  let component: SelectCellRendererComponent;
  let fixture: ComponentFixture<SelectCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
