import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApproveStoreComponent } from './approve-store.component';

describe('ApproveStoreComponent', () => {
  let component: ApproveStoreComponent;
  let fixture: ComponentFixture<ApproveStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
