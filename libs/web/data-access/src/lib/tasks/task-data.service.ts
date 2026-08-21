import { Injectable } from '@angular/core';
import {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from '@devflow/shared-types';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TaskDataService {
  abstract getAll(): Observable<Task[]>;
  abstract create(data: CreateTaskDto): Observable<Task>;
  abstract update(id: string, data: UpdateTaskDto): Observable<Task>;
  abstract delete(id: string): Observable<void>;
}
