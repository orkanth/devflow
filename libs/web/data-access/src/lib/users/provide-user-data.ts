import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MockUserService } from './mock-user.service';
import { UserDataService } from './user-data.service';

export function provideUserData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UserDataService, useClass: MockUserService },
  ]);
}
