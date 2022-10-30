import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MedicinesService } from './medicines.service';

describe('MedicinesService', () => {
  let service: MedicinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MedicinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
