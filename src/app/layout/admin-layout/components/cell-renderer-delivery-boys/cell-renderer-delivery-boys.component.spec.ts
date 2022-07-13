import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererDeliveryBoysComponent } from './cell-renderer-delivery-boys.component';

describe('CellRendererDeliveryBoysComponent', () => {
  let component: CellRendererDeliveryBoysComponent;
  let fixture: ComponentFixture<CellRendererDeliveryBoysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererDeliveryBoysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererDeliveryBoysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
