import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, of, tap } from 'rxjs';
import { ITokenResponse } from '../interfaces/ITokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = environment.apiBaseUrl;

  accessToken: string | null = null;
  refreshToken: string | null = null;

  login(payload: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    return this.http.post<ITokenResponse>(`${this.baseApiUrl}/auth/token`, formData).pipe(
      tap((val) => {
        this.accessToken = val.access_token;
        this.refreshToken = val.refresh_token;
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  get isAuth() {
    return this.accessToken !== null;
  }
}
