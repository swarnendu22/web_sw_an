import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ProductNupcListComponent } from './product-nupc-list.component';

describe('ProductNupcListComponent', () => {
  let component: ProductNupcListComponent;
  let fixture: ComponentFixture<ProductNupcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNupcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNupcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
