import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports:[CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    isMenuOpen = signal(false);
    isLoggedIn = signal(false); // Will be linked to auth service

    toggleMenu() {
        this.isMenuOpen.update(value => !value);
    }

    logout() {
        this.isLoggedIn.set(false);
    }
}