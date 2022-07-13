import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererDeleteQuicklinkComponent } from './cell-renderer-delete-quicklink.component';

describe('CellRendererDeleteQuicklinkComponent', () => {
  let component: CellRendererDeleteQuicklinkComponent;
  let fixture: ComponentFixture<CellRendererDeleteQuicklinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererDeleteQuicklinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererDeleteQuicklinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
