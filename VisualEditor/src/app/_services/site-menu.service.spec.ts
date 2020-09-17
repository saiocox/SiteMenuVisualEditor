import { TestBed } from '@angular/core/testing';

import { SiteMenuService } from './site-menu.service';

describe('SiteMenuService', () => {
  let service: SiteMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
