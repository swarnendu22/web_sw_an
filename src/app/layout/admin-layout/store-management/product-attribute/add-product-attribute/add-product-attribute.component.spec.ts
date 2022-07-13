import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddProductAttributeComponent } from './add-product-attribute.component';

describe('AddProductAttributeComponent', () => {
  let component: AddProductAttributeComponent;
  let fixture: ComponentFixture<AddProductAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
