import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditCatalogMasterFormComponent } from './edit-catalog-master-form.component';

describe('EditCatalogMasterFormComponent', () => {
  let component: EditCatalogMasterFormComponent;
  let fixture: ComponentFixture<EditCatalogMasterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCatalogMasterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatalogMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
