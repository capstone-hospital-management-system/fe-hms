import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TreatmentsService } from './treatments.service';

describe('TreatmentsService', () => {
  let service: TreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
