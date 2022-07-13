import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreComplianceComponent } from './store-compliance.component';

describe('StoreComplianceComponent', () => {
  let component: StoreComplianceComponent;
  let fixture: ComponentFixture<StoreComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreComplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
