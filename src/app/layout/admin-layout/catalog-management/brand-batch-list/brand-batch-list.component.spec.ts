import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBatchListComponent } from './brand-batch-list.component';

describe('BrandBatchListComponent', () => {
  let component: BrandBatchListComponent;
  let fixture: ComponentFixture<BrandBatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandBatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
