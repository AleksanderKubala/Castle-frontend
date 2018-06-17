import { TestBed, inject } from '@angular/core/testing';

import { BuildingTypeService } from './building-type.service';

describe('BuildingTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildingTypeService]
    });
  });

  it('should be created', inject([BuildingTypeService], (service: BuildingTypeService) => {
    expect(service).toBeTruthy();
  }));
});
