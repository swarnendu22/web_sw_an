import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewBadgeCellRendererCollectionsComponent } from './new-badge-cell-renderer-collections.component';

describe('NewBadgeCellRendererCollectionsComponent', () => {
  let component: NewBadgeCellRendererCollectionsComponent;
  let fixture: ComponentFixture<NewBadgeCellRendererCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBadgeCellRendererCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBadgeCellRendererCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
