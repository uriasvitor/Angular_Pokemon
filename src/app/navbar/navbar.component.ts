import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  routerLinkActive="text-indigo-400"
  toggleMobileMenu(): void {
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    mobileMenu?.classList.toggle('hidden');
    header?.classList.toggle('menu-is-open');
    mobileMenu?.classList.toggle('full-screen');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
