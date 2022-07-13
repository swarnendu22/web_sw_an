import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PendingExceptionComponent } from './pending-exception.component';

describe('PendingExceptionComponent', () => {
  let component: PendingExceptionComponent;
  let fixture: ComponentFixture<PendingExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
