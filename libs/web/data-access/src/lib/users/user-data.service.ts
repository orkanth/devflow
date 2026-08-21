import { Injectable } from '@angular/core';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '@devflow/shared-types';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UserDataService {
  abstract getAll(): Observable<User[]>;
  abstract create(data: CreateUserDto): Observable<User>;
  abstract update(id: string, data: UpdateUserDto): Observable<User>;
  abstract delete(id: string): Observable<void>;
}
