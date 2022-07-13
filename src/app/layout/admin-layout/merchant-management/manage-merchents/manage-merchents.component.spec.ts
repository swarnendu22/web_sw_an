import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageMerchentsComponent } from './manage-merchents.component';

describe('ManageMerchentsComponent', () => {
  let component: ManageMerchentsComponent;
  let fixture: ComponentFixture<ManageMerchentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMerchentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMerchentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
