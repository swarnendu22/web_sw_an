import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditProductAttributeSetComponent } from './edit-product-attribute-set.component';

describe('EditProductAttributeSetComponent', () => {
  let component: EditProductAttributeSetComponent;
  let fixture: ComponentFixture<EditProductAttributeSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductAttributeSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductAttributeSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
