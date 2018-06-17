import { TestBed, inject } from '@angular/core/testing';

import { CityManagementService } from './city-management.service';

describe('CityManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityManagementService]
    });
  });

  it('should be created', inject([CityManagementService], (service: CityManagementService) => {
    expect(service).toBeTruthy();
  }));
});
