import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererCopyButtonComponent } from './cell-renderer-copy-button.component';

describe('CellRendererCopyButtonComponent', () => {
  let component: CellRendererCopyButtonComponent;
  let fixture: ComponentFixture<CellRendererCopyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererCopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererCopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
