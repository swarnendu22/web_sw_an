import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { RegisterMercchantComponent } from './register-mercchant.component';

describe('RegisterMercchantComponent', () => {
  let component: RegisterMercchantComponent;
  let fixture: ComponentFixture<RegisterMercchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMercchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMercchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
