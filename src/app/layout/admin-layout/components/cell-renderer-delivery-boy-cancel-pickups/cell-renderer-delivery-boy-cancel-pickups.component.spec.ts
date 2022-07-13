import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererDeliveryBoyCancelPickupsComponent } from './cell-renderer-delivery-boy-cancel-pickups.component';

describe('CellRendererDeliveryBoyCancelPickupsComponent', () => {
  let component: CellRendererDeliveryBoyCancelPickupsComponent;
  let fixture: ComponentFixture<CellRendererDeliveryBoyCancelPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererDeliveryBoyCancelPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererDeliveryBoyCancelPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
