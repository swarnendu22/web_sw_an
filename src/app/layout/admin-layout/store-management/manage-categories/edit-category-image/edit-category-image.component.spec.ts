import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryImageComponent } from './edit-category-image.component';

describe('EditCategoryImageComponent', () => {
  let component: EditCategoryImageComponent;
  let fixture: ComponentFixture<EditCategoryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
