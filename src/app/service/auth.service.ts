import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthRequest } from './../models/AuthRequest';
import { AuthResponse } from './../models/AuthResponse';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKeys } from '../models/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string;
  api = 'auth';

  constructor(private http: HttpClient,
              private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  sign_in(req: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.api}/signin`, req);
  }

  logout() {
    this.unAuthenticate();
    this.router.navigate(['/sign-in']);
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.get<AuthResponse>(`${this.apiUrl}/${this.api}/refresh-token/${refreshToken}`).pipe(
      tap((res: AuthResponse) => {
        this.storeTokens(res);
    }));
  }

  getJwtToken(): string | null {
    return localStorage.getItem(StorageKeys.JWT_TOKEN);
  }

  getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private getRefreshToken() {
    return localStorage.getItem(StorageKeys.REFRESH_TOKEN);
  }

  storeTokens(res: AuthResponse) {
    if (res.token !==  null) {
      localStorage.setItem(StorageKeys.JWT_TOKEN, res.token);
    }
    if (res.refreshToken !== null) {
      localStorage.setItem(StorageKeys.REFRESH_TOKEN, res.refreshToken);
    }
    if (res.role !== null) {
      localStorage.setItem(StorageKeys.ROLE, res.role);
    }
    if (res.user !== null) {
      localStorage.setItem(StorageKeys.USER, JSON.stringify(res.user));
    }
    if (res.userAgence !== null) {
      localStorage.setItem(StorageKeys.USER_AGENCE, JSON.stringify(res.userAgence));
    }
  }

  deleteFromStorage(key: string): void {
    localStorage.removeItem(key);
  }

  unAuthenticate(): void {
    localStorage.clear();
  }

}
