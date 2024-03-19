import { Component, Inject } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuIsOpen = false;
  routerLinkActive="text-indigo-400"

  constructor(private navbarService: NavbarService, @Inject(DOCUMENT) private document: Document) {
    this.menuIsOpen = this.navbarService.isMobileMenuOpen;
  }

  toggleMobileMenu(): void {
    const mobileMenu = this.document.getElementById('mobile-menu');
    const header = this.document.getElementById('header');
    mobileMenu?.classList.toggle('hidden');
    header?.classList.toggle('menu-is-open');
    mobileMenu?.classList.toggle('full-screen');
    this.navbarService.toggleMenu();
  }
}
