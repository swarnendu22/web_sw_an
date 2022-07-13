import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ShowDraftDetailsComponent } from './show-draft-details.component';

describe('ShowDraftDetailsComponent', () => {
  let component: ShowDraftDetailsComponent;
  let fixture: ComponentFixture<ShowDraftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDraftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDraftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
