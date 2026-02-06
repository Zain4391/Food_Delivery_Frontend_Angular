import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormInput } from '../../../shared/components/form-input/form-input';
import { RoleTabs } from '../../../shared/components/role-tabs/role-tabs';
import { AuthHero } from '../../../shared/components/auth-hero/auth-hero';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup-user',
  imports: [ReactiveFormsModule, RouterLink, FormInput, RoleTabs, AuthHero],
  templateUrl: './signup-user.html',
  styleUrl: './signup-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupUser {
  // DI
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm: FormGroup;
  isSubmitting = signal(false);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get nameControl() {
    return this.signupForm.get('name') as FormControl;
  }

  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }

  get addressControl() {
    return this.signupForm.get('address') as FormControl;
  }

  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting.set(true);
      const { name, email, address, password } = this.signupForm.value;

      this.authService.register(name, email, address, password).subscribe({
        next: (response) => {
          console.log("Registration successful:", response);
          this.isSubmitting.set(false);
          this.router.navigate(['/customer-dashboard']);
        },
        error: (error) => {
          console.error("Registration failed:", error);
          this.isSubmitting.set(false);
          alert(error.error?.message || 'Registration failed. Please try again.');
        }
      });

    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

}
