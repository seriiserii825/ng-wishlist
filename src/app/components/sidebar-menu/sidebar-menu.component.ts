import { Component } from '@angular/core';
import { IMenuItem } from '../../interfaces/IMenuItem';

@Component({
  selector: 'app-sidebar-menu',
  imports: [],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  menuItems: IMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'home',
      route: '/dashboard',
    },
    {
      title: 'Users',
      icon: 'chat-bubble-left-ellipsis',
      route: '/users',
    },
    {
      title: 'Settings',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/settings',
    },
  ];
}
