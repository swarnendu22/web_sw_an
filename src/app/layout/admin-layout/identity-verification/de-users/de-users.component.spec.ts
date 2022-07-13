import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DEUsersComponent } from './de-users.component';

describe('DEUsersComponent', () => {
  let component: DEUsersComponent;
  let fixture: ComponentFixture<DEUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DEUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DEUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
