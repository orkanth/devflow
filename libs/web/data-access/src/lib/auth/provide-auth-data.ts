import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AuthDataService } from './auth-data.service';
import { MockAuthService } from './mock-auth.service';

export function provideAuthData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AuthDataService, useClass: MockAuthService },
  ]);
}
