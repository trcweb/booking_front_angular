import { AuthResponse } from './../models/AuthResponse';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { StorageKeys } from '../models/StorageKeys';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = this.authService.getJwtToken();
    if (jwt !== null) {
      request = this.addToken(request, jwt);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (this.authService.getFromStorage(StorageKeys.REFRESH_TOKEN) !== null) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      this.authService.deleteFromStorage(StorageKeys.JWT_TOKEN);

      return this.authService.refreshToken().pipe(
        switchMap((res: AuthResponse) => {
          this.isRefreshing = false;
          this.authService.unAuthenticate();
          this.authService.storeTokens(res);
          this.refreshTokenSubject.next(res.token);
          return next.handle(this.addToken(request, res.token!));
        }
        ),
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
          this.authService.logout(); }
          return throwError(err); }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
