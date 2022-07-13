import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApproveStoreDraftComponent } from './approve-store-draft.component';

describe('ApproveStoreDraftComponent', () => {
  let component: ApproveStoreDraftComponent;
  let fixture: ComponentFixture<ApproveStoreDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveStoreDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStoreDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
