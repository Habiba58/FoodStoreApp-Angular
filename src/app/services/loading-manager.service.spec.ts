import { TestBed } from '@angular/core/testing';

import { LoadingManagerService } from './loading-manager.service';

describe('LoadingManagerService', () => {
  let service: LoadingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
