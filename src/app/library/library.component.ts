import { ResourceService } from './../services/Resource.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  allPokemons:string[] = [];

  constructor(private resourceService:ResourceService){
  }

  getPokemonsLimited(startIndex:number, endIndex:number): string[]{
    return this.allPokemons.slice(startIndex, endIndex);
  }

}
