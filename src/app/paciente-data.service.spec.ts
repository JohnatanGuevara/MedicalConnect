import { TestBed } from '@angular/core/testing';

import { PacienteDataService } from './paciente-data.service';

describe('PacienteDataService', () => {
  let service: PacienteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
