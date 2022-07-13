import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererChangeSizechartButtonComponent } from './cell-renderer-change-sizechart-button.component';

describe('CellRendererChangeSizechartButtonComponent', () => {
  let component: CellRendererChangeSizechartButtonComponent;
  let fixture: ComponentFixture<CellRendererChangeSizechartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererChangeSizechartButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererChangeSizechartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
