import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PrivateCategoryComponent } from './private-category.component';

describe('PrivateCategoryComponent', () => {
  let component: PrivateCategoryComponent;
  let fixture: ComponentFixture<PrivateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
