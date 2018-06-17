import { TestBed, inject } from '@angular/core/testing';

import { ImageMapperService } from './image-mapper.service';

describe('ImageMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageMapperService]
    });
  });

  it('should be created', inject([ImageMapperService], (service: ImageMapperService) => {
    expect(service).toBeTruthy();
  }));
});
