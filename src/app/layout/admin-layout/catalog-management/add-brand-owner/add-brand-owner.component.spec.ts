import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandOwnerComponent } from './add-brand-owner.component';

describe('AddNewSizeComponent', () => {
  let component: AddBrandOwnerComponent;
  let fixture: ComponentFixture<AddBrandOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrandOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrandOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
