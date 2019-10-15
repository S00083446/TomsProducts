import { TestBed } from '@angular/core/testing';

import { ClipartService } from './clipart.service';

describe('ClipartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClipartService = TestBed.get(ClipartService);
    expect(service).toBeTruthy();
  });
});
