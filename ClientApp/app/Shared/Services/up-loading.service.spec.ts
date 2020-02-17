import { TestBed } from '@angular/core/testing';

import { UpLoadingService } from './up-loading.service';

describe('UpLoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpLoadingService = TestBed.get(UpLoadingService);
    expect(service).toBeTruthy();
  });
});
