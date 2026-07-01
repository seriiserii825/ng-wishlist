import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './page/search-page/search-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: SearchPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },
];
