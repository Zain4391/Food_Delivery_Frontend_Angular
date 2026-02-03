import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../shared/components/form-input/form-input';
import { RoleTabs } from '../../shared/components/role-tabs/role-tabs';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';

@Component({
  selector: 'app-login-driver',
  imports: [ReactiveFormsModule, RouterLink, FormInput, RoleTabs, AuthHero],
  templateUrl: './login-driver.html',
  styleUrl: './login-driver.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDriver {
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
      console.log("Form Submitted:", this.loginForm.value);

      // TODO: add api call to backend
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
