import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererButtonComponent } from './cell-renderer-button.component';

describe('CellRendererButtonComponent', () => {
  let component: CellRendererButtonComponent;
  let fixture: ComponentFixture<CellRendererButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
