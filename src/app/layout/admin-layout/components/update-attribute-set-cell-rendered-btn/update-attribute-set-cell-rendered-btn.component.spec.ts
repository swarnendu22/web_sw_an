import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UpdateAttributeSetCellRenderedBtnComponent } from './update-attribute-set-cell-rendered-btn.component';

describe('UpdateAttributeSetCellRenderedBtnComponent', () => {
  let component: UpdateAttributeSetCellRenderedBtnComponent;
  let fixture: ComponentFixture<UpdateAttributeSetCellRenderedBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAttributeSetCellRenderedBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributeSetCellRenderedBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
