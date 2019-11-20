import { TestBed } from '@angular/core/testing';

import { RFIDService } from './rfid.service';

describe('RFIDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RFIDService = TestBed.get(RFIDService);
    expect(service).toBeTruthy();
  });
});
