import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MockTaskService } from './mock-task.service';
import { TaskDataService } from './task-data.service';

export function provideTaskData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: TaskDataService, useClass: MockTaskService },
  ]);
}
