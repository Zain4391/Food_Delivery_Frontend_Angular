import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { VEHICLE_TYPE } from "../types/vehicle.type";

export function enumValidator(enumType: typeof VEHICLE_TYPE): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = Object.values(enumType).includes(control.value);
    return isValid ? null : { invalidEnumValue: { value: control.value } };
  };
}
