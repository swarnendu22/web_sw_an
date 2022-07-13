import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StorePropertiesComponent } from './store-properties.component';

describe('StorePropertiesComponent', () => {
  let component: StorePropertiesComponent;
  let fixture: ComponentFixture<StorePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
