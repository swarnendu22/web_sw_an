import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddNewQuicklinkComponent } from './add-new-quicklink.component';

describe('AddNewQuicklinkComponent', () => {
  let component: AddNewQuicklinkComponent;
  let fixture: ComponentFixture<AddNewQuicklinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewQuicklinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewQuicklinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
