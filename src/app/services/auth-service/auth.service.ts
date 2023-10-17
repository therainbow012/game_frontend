import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

export enum AuthEndPoint {
  LOGIN_USER = 'login',
  FORGOT_PASSWORD = 'forgot_password',
  RESET_PASSWORD = 'change_password',
  REGISTER_USER = 'register',

  UPDATE_PROFILE = 'updateProfile',
  CHANGE_PASSWORD = 'changePassword',
  OTP_VERIFICATION = '',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.baseUrl = environment.baseUrl;
  }

  // Login user API
  loginUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.LOGIN_USER,
      payload
    );
  }

  // Forgot-password API and send OTP
  forgotPassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.FORGOT_PASSWORD,
      payload
    );
  }

  // Create new password API
  resetPassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.RESET_PASSWORD,
      payload
    );
  }

  // register new user
  registerNewUser(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.REGISTER_USER,
      payload
    );
  }







  // Edit user profile API
  updateUserProfile(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.UPDATE_PROFILE,
      payload
    );
  }

  // User password change API
  changePassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + AuthEndPoint.CHANGE_PASSWORD,
      payload
    );
  }


  // Clear localStorage details
  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl('/login');
  }
}
