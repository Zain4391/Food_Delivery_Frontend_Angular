import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-role-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './role-tabs.html',
  styleUrl: './role-tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleTabs {
  activeRole = input<'customer' | 'driver' | 'admin'>('customer');
}

