import { TestBed } from '@angular/core/testing';

import { CurrencyListService } from './currency-list.service';

describe('CurrencyListService', () => {
  let service: CurrencyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
