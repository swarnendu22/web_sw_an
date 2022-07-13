import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UpdateStoreProductComponent } from './update-store-product.component';

describe('UpdateStoreProductComponent', () => {
  let component: UpdateStoreProductComponent;
  let fixture: ComponentFixture<UpdateStoreProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStoreProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
