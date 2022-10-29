import { TestBed } from '@angular/core/testing';

import { MedicinesService } from './prescriptions.service';

describe('MedicinesService', () => {
  let service: MedicinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
