import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type LucideIconData, ChevronDown, LucideAngularModule } from "lucide-angular";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: LucideIconData;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dropdown {
  label = input<string>('Label');
  placeholder = input<string>('Select option');
  options = input.required<DropdownOption[]>();
  icon = input<LucideIconData | null>(null); // Optional icon class or SVG path
  selectedValue = input<string>('');
  disabled = input<boolean>(false);
  
  valueChange = output<string>();
  
  isOpen = signal(false);
  readonly ChevronDown = ChevronDown;
  
  toggleDropdown() {
    if(!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }
  
  selectOption(option: DropdownOption) {
    this.valueChange.emit(option.value);
    this.isOpen.set(false);
  }
  
  getSelectedLabel(): string {
    const selected = this.options().find(opt => opt.value === this.selectedValue());
    return selected ? selected.label : this.placeholder();
  }
  
  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isOpen.set(false);
    }
  }
}
