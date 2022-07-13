import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FilterDeUsersComponent } from './filter-de-users-component.component';

describe('FilterDeUsersComponent', () => {
  let component: FilterDeUsersComponent;
  let fixture: ComponentFixture<FilterDeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDeUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
