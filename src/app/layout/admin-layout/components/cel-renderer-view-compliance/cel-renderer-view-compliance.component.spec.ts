import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CelRendererViewComplianceComponent } from './cel-renderer-view-compliance.component';

describe('CelRendererViewComplianceComponent', () => {
  let component: CelRendererViewComplianceComponent;
  let fixture: ComponentFixture<CelRendererViewComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelRendererViewComplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelRendererViewComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
