import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowFlashSaleComponent } from './show-flash-sale.component';

describe('ShowFlashSaleComponent', () => {
  let component: ShowFlashSaleComponent;
  let fixture: ComponentFixture<ShowFlashSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFlashSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFlashSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
