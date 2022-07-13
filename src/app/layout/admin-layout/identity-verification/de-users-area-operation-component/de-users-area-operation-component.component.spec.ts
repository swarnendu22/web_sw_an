import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeUsersAreaOperationComponent } from './de-users-area-operation-component.component';

describe('DeUsersAreaOperationComponent', () => {
  let component: DeUsersAreaOperationComponent;
  let fixture: ComponentFixture<DeUsersAreaOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeUsersAreaOperationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeUsersAreaOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
