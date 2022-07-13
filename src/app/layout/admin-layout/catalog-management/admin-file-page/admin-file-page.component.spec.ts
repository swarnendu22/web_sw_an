import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AdminFilePageComponent } from './admin-file-page.component';

describe('AdminFilePageComponent', () => {
  let component: AdminFilePageComponent;
  let fixture: ComponentFixture<AdminFilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
