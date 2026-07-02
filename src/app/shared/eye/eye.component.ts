import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-eye',
  imports: [],
  templateUrl: './eye.component.html',
  styleUrl: './eye.component.css',
})
export class EyeComponent {
  is_active = signal(false);

  toggleActive() {
    this.is_active.set(!this.is_active());
  }
}
