import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CollectionCellRendererUpdateOrDeleteComponent } from './collection-cell-renderer-update-or-delete.component';

describe('CollectionCellRendererUpdateOrDeleteComponent', () => {
  let component: CollectionCellRendererUpdateOrDeleteComponent;
  let fixture: ComponentFixture<CollectionCellRendererUpdateOrDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCellRendererUpdateOrDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCellRendererUpdateOrDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
