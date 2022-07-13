import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ElasticMasterCatalogComponent } from './elastic-master-catalog.component';

describe('ElasticMasterCatalogComponent', () => {
  let component: ElasticMasterCatalogComponent;
  let fixture: ComponentFixture<ElasticMasterCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElasticMasterCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticMasterCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
