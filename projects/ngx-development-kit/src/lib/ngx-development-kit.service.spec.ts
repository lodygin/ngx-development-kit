import { TestBed } from '@angular/core/testing';

import { NgxDevelopmentKitService } from './ngx-development-kit.service';

describe('NgxDevelopmentKitService', () => {
  let service: NgxDevelopmentKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDevelopmentKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
