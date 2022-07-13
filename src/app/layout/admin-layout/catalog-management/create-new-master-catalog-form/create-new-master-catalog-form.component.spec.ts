import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CreateNewMasterCatalogFormComponent } from './create-new-master-catalog-form.component';

describe('CreateNewMasterCatalogFormComponent', () => {
  let component: CreateNewMasterCatalogFormComponent;
  let fixture: ComponentFixture<CreateNewMasterCatalogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewMasterCatalogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMasterCatalogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
