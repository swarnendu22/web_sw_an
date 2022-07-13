import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GridLogoViewerComponent } from './grid-logo-viewer.component';

describe('GridLogoViewerComponent', () => {
  let component: GridLogoViewerComponent;
  let fixture: ComponentFixture<GridLogoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLogoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLogoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
