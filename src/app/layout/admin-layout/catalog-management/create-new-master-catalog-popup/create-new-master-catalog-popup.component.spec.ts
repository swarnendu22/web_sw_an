import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CreateNewMasterCatalogPopupComponent } from './create-new-master-catalog-popup.component';

describe('CreateNewMasterCatalogPopupComponent', () => {
  let component: CreateNewMasterCatalogPopupComponent;
  let fixture: ComponentFixture<CreateNewMasterCatalogPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewMasterCatalogPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewMasterCatalogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
