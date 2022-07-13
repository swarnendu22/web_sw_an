import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProductViewComponent } from './master-product-view.component';

describe('MasterProductViewComponent', () => {
  let component: MasterProductViewComponent;
  let fixture: ComponentFixture<MasterProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
