import { NavbarService } from './services/navbar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_Pokemon';
  hideOutlet = true;

  constructor(public navbarService:NavbarService){
    this.hideOutlet = this.navbarService.isMobileMenuOpen;
  }


}
