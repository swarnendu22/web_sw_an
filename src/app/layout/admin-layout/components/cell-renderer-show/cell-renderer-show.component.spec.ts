import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererShowComponent } from './cell-renderer-show.component';

describe('CellRendererShowComponent', () => {
  let component: CellRendererShowComponent;
  let fixture: ComponentFixture<CellRendererShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
