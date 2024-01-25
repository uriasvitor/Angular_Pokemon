import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class NavbarService {
  isMobileMenuOpen = false;

  toggleMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
