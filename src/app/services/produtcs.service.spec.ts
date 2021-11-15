import { TestBed } from '@angular/core/testing';

import { ProdutcsService } from './produtcs.service';

describe('ProdutcsService', () => {
  let service: ProdutcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
