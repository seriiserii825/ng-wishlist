import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course';
  getTestAccounts() {
    this.http.get(`${this.baseApiUrl}/test-accounts`);
  }
}
