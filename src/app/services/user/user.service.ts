import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from '../../models/interfaces/user/SignupUserResponse';
import { AuthResponse } from '../../models/interfaces/user/auth/AuthResponse';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas);
  }
}