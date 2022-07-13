import { TestBed } from '@angular/core/testing';

import { ApiMessageService } from './api-message.service';

describe('ApiMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMessageService = TestBed.get(ApiMessageService);
    expect(service).toBeTruthy();
  });
});
