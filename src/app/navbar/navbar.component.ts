import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementsByClassName('navbar').item(0);
    mobileMenu?.classList.toggle('hidden');
    navbar?.classList.toggle('menu-is-open');
    mobileMenu?.classList.toggle('full-screen');
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
