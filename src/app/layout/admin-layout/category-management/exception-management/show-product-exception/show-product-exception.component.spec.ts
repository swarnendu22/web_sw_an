import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowProductExceptionComponent } from './show-product-exception.component';

describe('ShowProductExceptionComponent', () => {
  let component: ShowProductExceptionComponent;
  let fixture: ComponentFixture<ShowProductExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProductExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
