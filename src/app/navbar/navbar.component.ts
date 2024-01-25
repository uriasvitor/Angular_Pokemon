import { Component } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuIsOpen = false;
  routerLinkActive="text-indigo-400"

  constructor(private navbarService: NavbarService){
    this.menuIsOpen = this.navbarService.isMobileMenuOpen;
  }

  toggleMobileMenu(): void {
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');
    mobileMenu?.classList.toggle('hidden');
    header?.classList.toggle('menu-is-open');
    mobileMenu?.classList.toggle('full-screen');
    this.navbarService.toggleMenu();
  }
}
