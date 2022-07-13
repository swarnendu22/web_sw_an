import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageStoreAssignComponent } from './manage-store-assign.component';

describe('ManageStoreAssignComponent', () => {
  let component: ManageStoreAssignComponent;
  let fixture: ComponentFixture<ManageStoreAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStoreAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStoreAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
