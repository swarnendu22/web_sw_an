import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreBulkFileComponent } from './store-bulk-file.component';

describe('StoreBulkFileComponent', () => {
  let component: StoreBulkFileComponent;
  let fixture: ComponentFixture<StoreBulkFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBulkFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBulkFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
