import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshed = false;

export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;
  if (!token) {
    return next(req);
  }
  if (isRefreshed) {
    return refreshAndProceed(authService, req, next);
  }
  req = addToken(req, token);
  return next(req).pipe(
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
  if (!isRefreshed) {
    isRefreshed = true;
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        if (!res) {
          return throwError(() => new Error('Unable to refresh token'));
        }
        return next(addToken(req, res.access_token));
      }),
    );
  }
  return next(addToken(req, authService.accessToken!));
}

function addToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
