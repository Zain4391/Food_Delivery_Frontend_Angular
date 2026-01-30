import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../shared/components/form-input/form-input';
import { Dropdown, type DropdownOption } from '../../shared/components/dropdown/dropdown';
import { RoleTabs } from '../../shared/components/role-tabs/role-tabs';
import { enumValidator } from '../../shared/validators/vehicle.type.validator';
import { VEHICLE_TYPE } from '../../shared/types/vehicle.type';
import { AuthHero } from '../../shared/components/auth-hero/auth-hero';
import { Bike, Car } from 'lucide-angular';

@Component({
  selector: 'app-signup-driver',
  imports: [ReactiveFormsModule, RouterLink, FormInput, Dropdown, RoleTabs, AuthHero],
  templateUrl: './signup-driver.html',
  styleUrl: './signup-driver.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupDriver {

  signupForm: FormGroup;
  isSubmitting = signal(false);
  selectedVehicle = signal('');
  
  vehicleOptions: DropdownOption[] = [
    { value: VEHICLE_TYPE.BIKE, label: 'Bike', icon: Bike },
    { value: VEHICLE_TYPE.CAR, label: 'Car', icon: Car }
  ];

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\(\)\-\+]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      vehicle_type: ['', [Validators.required, enumValidator(VEHICLE_TYPE)]],
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

  get vehicleTypeControl() {
    return this.signupForm.get('vehicle_type') as FormControl;
  }


  onVehicleChange(value: string) {
    this.selectedVehicle.set(value);
    this.vehicleTypeControl.setValue(value);
    this.vehicleTypeControl.markAsTouched();
  }

  onSubmit() {
    if(this.signupForm.valid) {
      this.isSubmitting.set(true);
      console.log("Form Submitted:", this.signupForm.value);

      // TODO: add api call to backend
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

}
