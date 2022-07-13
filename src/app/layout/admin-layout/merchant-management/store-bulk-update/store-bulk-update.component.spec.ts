import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBulkUpdateComponent } from './store-bulk-update.component';

describe('StoreBulkUpdateComponent', () => {
  let component: StoreBulkUpdateComponent;
  let fixture: ComponentFixture<StoreBulkUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBulkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBulkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
