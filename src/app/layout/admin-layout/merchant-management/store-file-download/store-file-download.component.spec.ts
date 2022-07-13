import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreFileDownloadComponent } from './store-file-download.component';

describe('StoreFileDownloadComponent', () => {
  let component: StoreFileDownloadComponent;
  let fixture: ComponentFixture<StoreFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
