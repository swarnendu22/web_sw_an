import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DisableOverlayComponent } from './disable-overlay.component';

describe('DisableOverlayComponent', () => {
  let component: DisableOverlayComponent;
  let fixture: ComponentFixture<DisableOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
