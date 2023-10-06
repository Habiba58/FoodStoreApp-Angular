import { TestBed } from '@angular/core/testing';

import { FoodManagerService } from './food-manager.service';

describe('FoodManagerService', () => {
  let service: FoodManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
