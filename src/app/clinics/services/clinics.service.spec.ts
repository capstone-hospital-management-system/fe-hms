import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClinicsService } from './clinics.service';

describe('ClinicsService', () => {
  let service: ClinicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClinicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
