import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DiagnosesService } from './diagnoses.service';

describe('DiagnosesService', () => {
  let service: DiagnosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DiagnosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
