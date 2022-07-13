import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StaticPageManagementComponent } from './static-page-management.component';

describe('StaticPageManagementComponent', () => {
  let component: StaticPageManagementComponent;
  let fixture: ComponentFixture<StaticPageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
