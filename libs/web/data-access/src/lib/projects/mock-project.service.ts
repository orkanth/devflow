import { Injectable } from '@angular/core';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from '@devflow/shared-types';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DEFAULT_PROJECT_STATUS,
  MOCK_OWNER_ID,
  MOCK_PROJECTS,
} from './mock-projects.data';
import { ProjectDataService } from './project-data.service';

@Injectable()
export class MockProjectService extends ProjectDataService {
  private projects = [...MOCK_PROJECTS];

  getAll(): Observable<Project[]> {
    return of([...this.projects]).pipe(delay(400));
  }

  create(data: CreateProjectDto): Observable<Project> {
    const project: Project = {
      id: `proj-${Date.now()}`,
      name: data.name.trim(),
      description: data.description.trim(),
      status: data.status ?? DEFAULT_PROJECT_STATUS,
      ownerId: MOCK_OWNER_ID,
      createdAt: new Date(),
    };
    this.projects = [project, ...this.projects];
    return of(project).pipe(delay(300));
  }

  update(id: string, data: UpdateProjectDto): Observable<Project> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Project not found'));
    }

    const updated: Project = {
      ...this.projects[index],
      ...data,
      name: data.name?.trim() ?? this.projects[index].name,
      description:
        data.description?.trim() ?? this.projects[index].description,
    };
    this.projects = [
      ...this.projects.slice(0, index),
      updated,
      ...this.projects.slice(index + 1),
    ];
    return of(updated).pipe(delay(300));
  }

  delete(id: string): Observable<void> {
    const exists = this.projects.some((p) => p.id === id);
    if (!exists) {
      return throwError(() => new Error('Project not found'));
    }
    this.projects = this.projects.filter((p) => p.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
