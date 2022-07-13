import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewProductExceptionComponent } from './add-new-product-exception.component';

describe('AddNewProductExceptionComponent', () => {
  let component: AddNewProductExceptionComponent;
  let fixture: ComponentFixture<AddNewProductExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProductExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProductExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
