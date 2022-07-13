import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EditDeCommissionSettingComponent } from './edit-de-commission-setting.component';

describe('EditDeCommissionSettingComponent', () => {
  let component: EditDeCommissionSettingComponent;
  let fixture: ComponentFixture<EditDeCommissionSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeCommissionSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeCommissionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
