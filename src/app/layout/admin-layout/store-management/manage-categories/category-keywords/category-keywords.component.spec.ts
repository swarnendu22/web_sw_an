import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CategoryKeywordsComponent } from './category-keywords.component';

describe('CategoryKeywordsComponent', () => {
  let component: CategoryKeywordsComponent;
  let fixture: ComponentFixture<CategoryKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
