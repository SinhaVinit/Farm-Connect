import { TestBed } from '@angular/core/testing';

import { OpenforumService } from './openforum.service';

describe('OpenforumService', () => {
  let service: OpenforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
