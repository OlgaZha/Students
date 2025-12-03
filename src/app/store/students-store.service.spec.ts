import { TestBed } from '@angular/core/testing';

import { StudentsStoreService } from './students-store.service';

describe('StudentsStoreService', () => {
  let service: StudentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
