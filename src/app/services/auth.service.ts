import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { RefreshToken } from '../interfaces/refresh-token-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey: string = 'token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/Account/Login`, data)
      .pipe(
        map((response: AuthResponse) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/Register`,
      data
    );
  }
  
  getDetail = (): Observable<UserDetail> => {
    return this.http.get<UserDetail>(`${this.apiUrl}/Account/Detail`);
  };

  getToken = (): string | null => {
    const user = localStorage.getItem(this.tokenKey);
    if (!user) {
      return null;
    }

    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.tokenKey);
    if (!user) {
      return null;
    }

    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  };

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decode = jwtDecode(token);
    const isTokenExpired = Date.now() >= decode['exp']! * 1000;
    return isTokenExpired;
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetail;
  };

  getAll = (): Observable<UserDetail[]> => {
    return this.http.get<UserDetail[]>(`${this.apiUrl}/Account/`);
  };

  refreshToken = (data: RefreshToken): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/Refresh-Token`,
      data
    );
  };

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);

    return decodedToken.role || null;
  };

  forgotPassword = (email: string): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/Forgot-Password`,
      { email }
    );
  };

  resetPassword = (data: ResetPasswordRequest): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/Reset-Password`,
      data
    );
  };

  changePassword = (data: ChangePasswordRequest): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/Account/Change-Password`,
      data
    );
  };
}
