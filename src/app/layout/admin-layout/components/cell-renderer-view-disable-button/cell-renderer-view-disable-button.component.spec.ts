import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererViewDisableButtonComponent } from './cell-renderer-view-disable-button.component';

describe('CellRendererViewDisableButtonComponent', () => {
  let component: CellRendererViewDisableButtonComponent;
  let fixture: ComponentFixture<CellRendererViewDisableButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererViewDisableButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererViewDisableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
