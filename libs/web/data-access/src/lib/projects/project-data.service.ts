import { Injectable } from '@angular/core';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from '@devflow/shared-types';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export abstract class ProjectDataService {
  abstract getAll(): Observable<Project[]>;
  abstract create(data: CreateProjectDto): Observable<Project>;
  abstract update(id: string, data: UpdateProjectDto): Observable<Project>;
  abstract delete(id: string): Observable<void>;
}
