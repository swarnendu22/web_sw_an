import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FlashSalesListComponent } from './flash-sales-list.component';

describe('FlashSalesListComponent', () => {
  let component: FlashSalesListComponent;
  let fixture: ComponentFixture<FlashSalesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashSalesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
