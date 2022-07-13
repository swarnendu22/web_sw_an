import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CreateNewFlashSaleComponent } from './create-new-flash-sale.component';

describe('CreateNewFlashSaleComponent', () => {
  let component: CreateNewFlashSaleComponent;
  let fixture: ComponentFixture<CreateNewFlashSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewFlashSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewFlashSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
