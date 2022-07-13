import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageMasterCatalogComponent } from './manage-master-catalog.component';

describe('ManageMasterCatalogComponent', () => {
  let component: ManageMasterCatalogComponent;
  let fixture: ComponentFixture<ManageMasterCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMasterCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
