import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Food-Delivery');
  
  private router = inject(Router);
  
  // Track current URL to hide navbar/footer on auth pages
  private navigationEnd$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  );
  
  private currentNavigation = toSignal(this.navigationEnd$, { initialValue: null });
  
  showLayout = computed(() => {
    const nav = this.currentNavigation();
    const url = nav?.urlAfterRedirects || this.router.url;
    // Hide navbar and footer on auth pages
    return !url.startsWith('/signup') && !url.startsWith('/login');
  });
}
