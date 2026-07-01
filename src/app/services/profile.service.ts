import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProfile } from '../interfaces/IProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = environment.apiBaseUrl;
  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/account/test_accounts`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }
}
