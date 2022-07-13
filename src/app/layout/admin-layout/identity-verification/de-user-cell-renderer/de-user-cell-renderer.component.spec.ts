import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeUserCellRendererComponent } from './de-user-cell-renderer.component';

describe('DeUserCellRendererComponent', () => {
  let component: DeUserCellRendererComponent;
  let fixture: ComponentFixture<DeUserCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeUserCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeUserCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
