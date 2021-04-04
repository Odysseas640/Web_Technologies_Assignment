import { TestBed } from '@angular/core/testing';

import { ErrorJWTInterceptor } from './error-jwt.interceptor';

describe('ErrorJWTInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorJWTInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorJWTInterceptor = TestBed.inject(ErrorJWTInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
