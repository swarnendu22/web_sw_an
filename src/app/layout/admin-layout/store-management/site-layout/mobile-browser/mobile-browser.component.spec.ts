import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MobileBrowserComponent } from './mobile-browser.component';

describe('MobileBrowserComponent', () => {
  let component: MobileBrowserComponent;
  let fixture: ComponentFixture<MobileBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
