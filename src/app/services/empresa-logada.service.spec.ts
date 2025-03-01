import { TestBed } from '@angular/core/testing';

import { EmpresaLogadaService } from './empresa-logada.service';

describe('EmpresaLogadaService', () => {
  let service: EmpresaLogadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaLogadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
