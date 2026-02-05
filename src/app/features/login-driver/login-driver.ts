import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormInput } from '../../shared/components/form-input/form-input';
import { RoleTabs } from '../../shared/components/role-tabs/role-tabs';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-driver',
  imports: [ReactiveFormsModule, RouterLink, FormInput, RoleTabs, AuthHero],
  templateUrl: './login-driver.html',
  styleUrl: './login-driver.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDriver {
  // DI
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  isSubmitting = signal(false);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.isSubmitting.set(true);
      const { email, password } = this.loginForm.value;

      this.authService.loginDriver(email, password).subscribe({
        next: (response) => {
          console.log("Driver login successful:", response);
          this.isSubmitting.set(false);
          this.router.navigate(['/driver-dashboard']);
        },
        error: (error) => {
          console.error("Driver login failed:", error);
          this.isSubmitting.set(false);
          alert(error.error?.message || 'Login failed. Please check your credentials.');
        }
      });

    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
