import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeleteCellRendererButtonComponent } from './delete-cell-renderer-button.component';

describe('DeleteCellRendererButtonComponent', () => {
  let component: DeleteCellRendererButtonComponent;
  let fixture: ComponentFixture<DeleteCellRendererButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCellRendererButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCellRendererButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
