import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AdminFileDownloadComponent } from './admin-file-download.component';

describe('AdminFileDownloadComponent', () => {
  let component: AdminFileDownloadComponent;
  let fixture: ComponentFixture<AdminFileDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFileDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
