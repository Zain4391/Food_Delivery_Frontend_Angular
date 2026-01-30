import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../../shared/components/form-input/form-input';
import { RoleTabs } from '../../../shared/components/role-tabs/role-tabs';
import { AuthHero } from '../../../shared/components/auth-hero/auth-hero';

@Component({
  selector: 'app-signup-user',
  imports: [ReactiveFormsModule, RouterLink, FormInput, RoleTabs, AuthHero],
  templateUrl: './signup-user.html',
  styleUrl: './signup-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupUser {
  signupForm: FormGroup;
  isSubmitting = signal(false);

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\(\)\-\+]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get fullNameControl() {
    return this.signupForm.get('fullName') as FormControl;
  }

  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }

  get phoneControl() {
    return this.signupForm.get('phone') as FormControl;
  }

  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting.set(true);
      console.log('Form submitted:', this.signupForm.value);
      // TODO: Call auth service to register user
      setTimeout(() => this.isSubmitting.set(false), 2000);
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

}
