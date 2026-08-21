import { Injectable } from '@angular/core';
import { AuthSession, LoginCredentials } from '@devflow/shared-types';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AuthDataService {
  abstract login(credentials: LoginCredentials): Observable<AuthSession>;
}
