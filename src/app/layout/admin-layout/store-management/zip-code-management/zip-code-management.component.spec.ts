import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ZipCodeManagementComponent } from './zip-code-management.component';

describe('ZipCodeManagementComponent', () => {
  let component: ZipCodeManagementComponent;
  let fixture: ComponentFixture<ZipCodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipCodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
