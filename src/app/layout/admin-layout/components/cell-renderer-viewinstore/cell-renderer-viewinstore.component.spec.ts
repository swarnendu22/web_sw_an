import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CellRendererViewinstoreComponent } from './cell-renderer-viewinstore.component';

describe('CellRendererViewinstoreComponent', () => {
  let component: CellRendererViewinstoreComponent;
  let fixture: ComponentFixture<CellRendererViewinstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererViewinstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererViewinstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
