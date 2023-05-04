import { TestBed } from '@angular/core/testing';

import { IpAddressHandlerService } from './ip-address-handler.service';

describe('IpAddressHandlerService', () => {
  let service: IpAddressHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpAddressHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
