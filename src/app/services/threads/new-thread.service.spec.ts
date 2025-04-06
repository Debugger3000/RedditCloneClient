import { TestBed } from '@angular/core/testing';

import { NewThreadService } from './new-thread.service';

describe('NewThreadService', () => {
  let service: NewThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
