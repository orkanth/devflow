import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MockProjectService } from './mock-project.service';
import { ProjectDataService } from './project-data.service';

export function provideProjectData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ProjectDataService, useClass: MockProjectService },
  ]);
}
