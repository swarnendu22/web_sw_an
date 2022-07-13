import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AgMatDateFilterComponent } from './ag-mat-date-filter.component';

describe('AgMatDateFilterComponent', () => {
  let component: AgMatDateFilterComponent;
  let fixture: ComponentFixture<AgMatDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgMatDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgMatDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
