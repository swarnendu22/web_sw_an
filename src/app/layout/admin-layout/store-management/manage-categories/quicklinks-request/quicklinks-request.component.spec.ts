import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { QuicklinksRequestComponent } from './quicklinks-request.component';

describe('QuicklinksRequestComponent', () => {
  let component: QuicklinksRequestComponent;
  let fixture: ComponentFixture<QuicklinksRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicklinksRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicklinksRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
