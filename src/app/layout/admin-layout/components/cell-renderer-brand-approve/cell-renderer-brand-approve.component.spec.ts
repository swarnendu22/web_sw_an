import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRendererBrandApproveComponent } from './cell-renderer-brand-approve.component';

describe('CellRendererBrandApproveComponent', () => {
  let component: CellRendererBrandApproveComponent;
  let fixture: ComponentFixture<CellRendererBrandApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellRendererBrandApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellRendererBrandApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
