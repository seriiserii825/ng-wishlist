import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { EyeComponent } from '../../shared/eye/eye.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, EyeComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err),
      });
    }
  }
}
