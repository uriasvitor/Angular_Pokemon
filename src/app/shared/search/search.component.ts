import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonsDetails } from 'src/app/models/pokemonsDetails.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  @Input() libraryList: PokemonsDetails[] | undefined;
  @Output() sendFiltredPokemons = new EventEmitter();
  filtredPokemons: PokemonsDetails[] | undefined;

  ngOnInit(): void {

  }

  filtredResult(text:string){
    if(!text || text.trim() === ''){
      this.filtredPokemons = this.libraryList;
      this.sendFiltredPokemons.emit(this.filtredPokemons)
      return
    }

    this.filtredPokemons = this.libraryList?.filter(
      pokemons => pokemons.name.includes(text.toLowerCase()))

    this.sendFiltredPokemons.emit(this.filtredPokemons)
  }

}
