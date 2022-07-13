import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeliveryCenterComponent } from './delivery-center.component';

describe('DeliveryCenterComponent', () => {
  let component: DeliveryCenterComponent;
  let fixture: ComponentFixture<DeliveryCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
