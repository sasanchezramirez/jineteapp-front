import { TestBed } from '@angular/core/testing';

import { JineteoService } from './jineteo.service';

describe('JineteoService', () => {
  let service: JineteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JineteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
