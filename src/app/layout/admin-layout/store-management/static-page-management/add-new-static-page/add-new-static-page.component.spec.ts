import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewStaticPageComponent } from './add-new-static-page.component';

describe('AddNewStaticPageComponent', () => {
  let component: AddNewStaticPageComponent;
  let fixture: ComponentFixture<AddNewStaticPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewStaticPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
