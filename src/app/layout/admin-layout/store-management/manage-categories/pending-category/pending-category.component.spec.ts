import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingCategoryComponent } from './pending-category.component';

describe('PendingCategoryComponent', () => {
  let component: PendingCategoryComponent;
  let fixture: ComponentFixture<PendingCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
