import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInput {
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<string>('text');
  icon = input.required<string>();
  control = input.required<FormControl>();
  showPasswordToggle = input<boolean>(false);
}
