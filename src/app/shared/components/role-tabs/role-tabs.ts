import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-role-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './role-tabs.html',
  styleUrl: './role-tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleTabs {
  activeRole = input<'customer' | 'driver' | 'admin'>('customer');

  constructor(private router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }

  get customerRoute(): string {
    return this.isLoginPage ? '/login' : '/signup';
  }

  get driverRoute(): string {
    return this.isLoginPage ? '/login-driver' : '/signup-driver';
  }

  get adminRoute(): string {
    return this.isLoginPage ? '/login-admin' : '/signup-admin';
  }
}

