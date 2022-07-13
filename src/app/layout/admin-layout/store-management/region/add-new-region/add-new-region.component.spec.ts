import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewRegionComponent } from './add-new-region.component';

describe('AddNewRegionComponent', () => {
  let component: AddNewRegionComponent;
  let fixture: ComponentFixture<AddNewRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
