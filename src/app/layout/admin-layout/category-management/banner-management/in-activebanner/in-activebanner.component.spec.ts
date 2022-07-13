import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { InActivebannerComponent } from './in-activebanner.component';

describe('InActivebannerComponent', () => {
  let component: InActivebannerComponent;
  let fixture: ComponentFixture<InActivebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InActivebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InActivebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
