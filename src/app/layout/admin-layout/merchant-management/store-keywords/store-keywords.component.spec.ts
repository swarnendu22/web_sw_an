import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StoreKeywordsComponent } from './store-keywords.component';

describe('StoreKeywordsComponent', () => {
  let component: StoreKeywordsComponent;
  let fixture: ComponentFixture<StoreKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
