import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreOperationComponent } from './store-operation.component';

describe('StoreOperationComponent', () => {
  let component: StoreOperationComponent;
  let fixture: ComponentFixture<StoreOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
