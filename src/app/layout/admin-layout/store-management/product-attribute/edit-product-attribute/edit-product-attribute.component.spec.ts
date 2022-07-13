import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditProductAttributeComponent } from './edit-product-attribute.component';

describe('EditProductAttributeComponent', () => {
  let component: EditProductAttributeComponent;
  let fixture: ComponentFixture<EditProductAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
