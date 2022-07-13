import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowCommissionExceptionComponent } from './show-commission-exception.component';

describe('ShowCommissionExceptionComponent', () => {
  let component: ShowCommissionExceptionComponent;
  let fixture: ComponentFixture<ShowCommissionExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCommissionExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommissionExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
