import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewNadgeZoneZipcodeCellRendererComponent } from './new-nadge-zone-zipcode-cell-renderer.component';

describe('NewNadgeZoneZipcodeCellRendererComponent', () => {
  let component: NewNadgeZoneZipcodeCellRendererComponent;
  let fixture: ComponentFixture<NewNadgeZoneZipcodeCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNadgeZoneZipcodeCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNadgeZoneZipcodeCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
