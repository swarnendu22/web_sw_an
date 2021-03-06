import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AndroidLayoutComponent } from './android-layout.component';

describe('AndroidLayoutComponent', () => {
  let component: AndroidLayoutComponent;
  let fixture: ComponentFixture<AndroidLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
