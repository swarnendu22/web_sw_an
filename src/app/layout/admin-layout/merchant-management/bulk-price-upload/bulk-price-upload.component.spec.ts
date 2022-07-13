import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPriceUploadComponent } from './bulk-price-upload.component';

describe('BulkPriceUploadComponent', () => {
  let component: BulkPriceUploadComponent;
  let fixture: ComponentFixture<BulkPriceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkPriceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkPriceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
