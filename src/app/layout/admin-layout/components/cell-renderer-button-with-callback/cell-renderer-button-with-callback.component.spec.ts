import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererButtonWithCallbackComponent } from './cell-renderer-button-with-callback.component';

describe('CellRendererButtonWithCallbackComponent', () => {
  let component: CellRendererButtonWithCallbackComponent;
  let fixture: ComponentFixture<CellRendererButtonWithCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererButtonWithCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererButtonWithCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
