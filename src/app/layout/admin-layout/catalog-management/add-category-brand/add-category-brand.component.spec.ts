import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryBrandComponent } from './add-category-brand.component';

describe('AddCategoryBrandComponent', () => {
  let component: AddCategoryBrandComponent;
  let fixture: ComponentFixture<AddCategoryBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
