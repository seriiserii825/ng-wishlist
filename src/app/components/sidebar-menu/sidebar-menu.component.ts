import { Component } from '@angular/core';
import { IMenuItem } from '../../interfaces/IMenuItem';
import { HomeIcon } from '../../icons/home-icon/home-icon';
import { ChatIcon } from '../../icons/chat-icon/chat-icon';
import { SearchIcon } from '../../icons/search-icon/search-icon';

@Component({
  selector: 'app-sidebar-menu',
  imports: [HomeIcon, ChatIcon, SearchIcon],
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
      icon: 'chat',
      route: '/users',
    },
    {
      title: 'Settings',
      icon: 'search',
      route: '/settings',
    },
  ];
}
