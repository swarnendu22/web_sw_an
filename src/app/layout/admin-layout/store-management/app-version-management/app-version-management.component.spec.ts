import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppVersionManagementComponent } from './app-version-management.component';

describe('AppVersionManagementComponent', () => {
  let component: AppVersionManagementComponent;
  let fixture: ComponentFixture<AppVersionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVersionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVersionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
