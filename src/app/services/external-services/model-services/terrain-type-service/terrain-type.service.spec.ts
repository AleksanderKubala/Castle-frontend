import { TestBed, inject } from '@angular/core/testing';

import { TerrainService } from './terrain-type.service';

describe('TerrainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerrainService]
    });
  });

  it('should be created', inject([TerrainService], (service: TerrainService) => {
    expect(service).toBeTruthy();
  }));
});
