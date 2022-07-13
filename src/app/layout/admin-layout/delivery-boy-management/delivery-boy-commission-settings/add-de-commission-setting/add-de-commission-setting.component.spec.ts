import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddDeCommissionSettingComponent } from './add-de-commission-setting.component';

describe('AddDeCommissionSettingComponent', () => {
  let component: AddDeCommissionSettingComponent;
  let fixture: ComponentFixture<AddDeCommissionSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeCommissionSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeCommissionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
