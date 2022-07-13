import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DeCommissionSettingsListComponent } from './de-commission-settings-list.component';

describe('DeCommissionSettingsListComponent', () => {
  let component: DeCommissionSettingsListComponent;
  let fixture: ComponentFixture<DeCommissionSettingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeCommissionSettingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeCommissionSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
