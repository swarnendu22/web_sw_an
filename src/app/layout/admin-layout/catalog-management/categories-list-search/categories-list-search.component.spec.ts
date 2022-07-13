import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListSearchComponent } from './categories-list-search.component';

describe('CategoriesListSearchComponent', () => {
  let component: CategoriesListSearchComponent;
  let fixture: ComponentFixture<CategoriesListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
