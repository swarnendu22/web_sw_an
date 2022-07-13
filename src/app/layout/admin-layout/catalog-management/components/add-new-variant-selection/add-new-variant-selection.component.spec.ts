import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewVariantSelectionComponent } from './add-new-variant-selection.component';

describe('AddNewVariantSelectionComponent', () => {
  let component: AddNewVariantSelectionComponent;
  let fixture: ComponentFixture<AddNewVariantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVariantSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVariantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
