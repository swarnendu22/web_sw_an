import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ParentCategoryDropDownComponent } from './parent-category-drop-down.component';

describe('MultiSelectComponent', () => {
  let component: ParentCategoryDropDownComponent;
  let fixture: ComponentFixture<ParentCategoryDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentCategoryDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCategoryDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
