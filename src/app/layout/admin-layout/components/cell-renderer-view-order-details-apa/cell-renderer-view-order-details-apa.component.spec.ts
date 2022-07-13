import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererViewOrderDetailsApaComponent } from './cell-renderer-view-order-details-apa.component';

describe('CellRendererViewOrderDetailsApaComponent', () => {
  let component: CellRendererViewOrderDetailsApaComponent;
  let fixture: ComponentFixture<CellRendererViewOrderDetailsApaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererViewOrderDetailsApaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererViewOrderDetailsApaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
