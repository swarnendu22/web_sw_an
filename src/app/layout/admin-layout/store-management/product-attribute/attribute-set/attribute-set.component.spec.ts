import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AttributeSetComponent } from './attribute-set.component';

describe('AttributeSetComponent', () => {
  let component: AttributeSetComponent;
  let fixture: ComponentFixture<AttributeSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
