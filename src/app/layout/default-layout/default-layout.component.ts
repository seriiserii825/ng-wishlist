import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent implements OnInit {
  profileService = inject(ProfileService);

  ngOnInit() {
    console.log('DefaultLayoutComponent initialized');
    this.profileService.getMe().subscribe((profile) => {
      if (profile) {
        console.log('User profile:', profile);
      } else {
        console.log('Failed to fetch user profile');
      }
    });
  }
}
