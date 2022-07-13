import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageDraftComponent } from './manage-draft.component';

describe('ManageDraftComponent', () => {
  let component: ManageDraftComponent;
  let fixture: ComponentFixture<ManageDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
