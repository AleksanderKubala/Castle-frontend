import { TestBed, inject } from '@angular/core/testing';

import { StructureTypeService } from './structure-type.service';

describe('StructureTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructureTypeService]
    });
  });

  it('should be created', inject([StructureTypeService], (service: StructureTypeService) => {
    expect(service).toBeTruthy();
  }));
});
