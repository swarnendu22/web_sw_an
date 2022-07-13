import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPrductStoreBulkComponent } from './copy-prduct-store-bulk.component';

describe('CopyPrductStoreBulkComponent', () => {
  let component: CopyPrductStoreBulkComponent;
  let fixture: ComponentFixture<CopyPrductStoreBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyPrductStoreBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPrductStoreBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
