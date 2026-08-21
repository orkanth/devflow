import { Injectable } from '@angular/core';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '@devflow/shared-types';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DEFAULT_USER_ROLE, MOCK_USERS } from './mock-users.data';
import { UserDataService } from './user-data.service';

@Injectable()
export class MockUserService extends UserDataService {
  private users = [...MOCK_USERS];

  getAll(): Observable<User[]> {
    return of([...this.users]).pipe(delay(350));
  }

  create(data: CreateUserDto): Observable<User> {
    const email = data.email.trim().toLowerCase();
    if (this.users.some((u) => u.email === email)) {
      return throwError(() => new Error('Email already exists'));
    }

    const user: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email,
      role: data.role ?? DEFAULT_USER_ROLE,
    };
    this.users = [user, ...this.users];
    return of(user).pipe(delay(300));
  }

  update(id: string, data: UpdateUserDto): Observable<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    const current = this.users[index];
    const email = data.email?.trim().toLowerCase();
    if (email && this.users.some((u) => u.id !== id && u.email === email)) {
      return throwError(() => new Error('Email already exists'));
    }

    const updated: User = {
      ...current,
      ...data,
      name: data.name?.trim() ?? current.name,
      email: email ?? current.email,
    };
    this.users = [
      ...this.users.slice(0, index),
      updated,
      ...this.users.slice(index + 1),
    ];
    return of(updated).pipe(delay(300));
  }

  delete(id: string): Observable<void> {
    const exists = this.users.some((u) => u.id === id);
    if (!exists) {
      return throwError(() => new Error('User not found'));
    }
    this.users = this.users.filter((u) => u.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
