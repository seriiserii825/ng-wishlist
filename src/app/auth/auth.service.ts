import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ITokenResponse } from '../interfaces/ITokenResponse';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = environment.apiBaseUrl;
  cookieService = inject(CookieService);
  router = inject(Router);

  accessToken: string | null = null;
  refreshToken: string | null = null;

  login(payload: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    return this.http.post<ITokenResponse>(`${this.baseApiUrl}/auth/token`, formData).pipe(
      tap((val) => this.saveTokens(val)),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('access_token') || null;
      this.refreshToken = this.cookieService.get('refresh_token') || null;
    }

    return this.accessToken !== null;
  }

  refreshAuthToken(): Observable<ITokenResponse | null> {
    const refreshToken = this.cookieService.get('refresh_token');
    if (!refreshToken) {
      return of(null);
    }

    return this.http
      .post<ITokenResponse>(`${this.baseApiUrl}/auth/refresh`, {
        refresh_token: refreshToken,
      })
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        }),
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: ITokenResponse) {
    this.accessToken = res.access_token;
    this.refreshToken = res.refresh_token;
    this.cookieService.set('access_token', res.access_token);
    this.cookieService.set('refresh_token', res.refresh_token);
  }
}
