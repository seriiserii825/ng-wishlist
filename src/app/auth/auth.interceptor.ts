import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, finalize, Observable, share, switchMap, throwError } from 'rxjs';
import { ITokenResponse } from '../interfaces/ITokenResponse';

let refresh$: Observable<ITokenResponse | null> | null = null;

export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  if (!token) {
    return next(req);
  }
  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return refreshAndProceed(authService, req, next);
      }
      return throwError(() => err);
    }),
  );
};

function refreshAndProceed(
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  if (!refresh$) {
    refresh$ = authService.refreshAuthToken().pipe(
      finalize(() => (refresh$ = null)),
      share(),
    );
  }
  return refresh$.pipe(
    switchMap((res) => {
      if (!res) {
        return throwError(() => new Error('Unable to refresh token'));
      }
      return next(addToken(req, res.access_token));
    }),
  );
}

function addToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
