import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddAttributeFromCatalogComponent } from './add-attribute-from-catalog.component';

describe('AddAttributeFromCatalogComponent', () => {
  let component: AddAttributeFromCatalogComponent;
  let fixture: ComponentFixture<AddAttributeFromCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttributeFromCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributeFromCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
