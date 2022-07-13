import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { VariantImageComponent } from './variant-image.component';

describe('VariantImageComponent', () => {
  let component: VariantImageComponent;
  let fixture: ComponentFixture<VariantImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
