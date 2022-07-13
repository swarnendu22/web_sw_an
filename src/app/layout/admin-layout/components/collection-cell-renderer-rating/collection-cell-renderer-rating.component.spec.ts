import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CollectionCellRendererRatingComponent } from './collection-cell-renderer-rating.component';

describe('CollectionCellRendererRatingComponent', () => {
  let component: CollectionCellRendererRatingComponent;
  let fixture: ComponentFixture<CollectionCellRendererRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCellRendererRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCellRendererRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
