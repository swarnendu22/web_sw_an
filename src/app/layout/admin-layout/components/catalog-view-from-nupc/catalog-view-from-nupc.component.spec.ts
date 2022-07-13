import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CatalogViewFromNupcComponent } from './catalog-view-from-nupc.component';

describe('CatalogViewFromNupcComponent', () => {
  let component: CatalogViewFromNupcComponent;
  let fixture: ComponentFixture<CatalogViewFromNupcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogViewFromNupcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogViewFromNupcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
