import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ManageDraftActionComponent } from './manage-draft-action.component';

describe('ManageDraftActionComponent', () => {
  let component: ManageDraftActionComponent;
  let fixture: ComponentFixture<ManageDraftActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDraftActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDraftActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
