import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UpdateCellRendererButtonComponent } from './update-cell-renderer-button.component';

describe('UpdateCellRendererButtonComponent', () => {
  let component: UpdateCellRendererButtonComponent;
  let fixture: ComponentFixture<UpdateCellRendererButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCellRendererButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCellRendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
