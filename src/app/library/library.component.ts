import { SharedDataService } from './../services/sharedDataService';
import { PokemonService } from './../services/pokemon.service';
import { PokemonsDetails } from '../models/pokemonsDetails.model';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  cardsList: PokemonsDetails[] | undefined;
  cachedCardList: PokemonsDetails[] | undefined;
  inLoading:boolean = true;
  cardsPerPage = 20;
  cardslimit = 200;
  startIndex = 0;
  endIndex = 0;

  constructor(private pokemonService: PokemonService, private sharedDataService:SharedDataService) {}

  ngOnInit(): void {
    if (this.pokemonService.allPokemons.length > 0) {
      this.cardsList = this.pokemonService.allPokemons;
      this.cachedCardList = this.cardsList;

      if(this.sharedDataService.endIndex){
        this.endIndex = this.sharedDataService.endIndex;
      }else{
        this.endIndex = this.cardsPerPage
      }

      this.inLoading = false;

    } else {
      this.pokemonService.getPokemonsLibrary(this.cardslimit).subscribe({
        next: (data) => {
          this.cardsList = data;
          this.cachedCardList = this.cardsList;
          this.endIndex = this.cardsPerPage;
          this.inLoading = false;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  loadMore(): void {
    this.endIndex += this.cardsPerPage;
    this.sharedDataService.endIndex = this.endIndex;
  }

  handleFiltredPokemons(filtredCards:[]) {
    if(filtredCards.length < 1 ){
      this.cardsList = this.cachedCardList;
      return
    }

    this.cardsList = filtredCards;
    this.endIndex = this.cardsPerPage;
    this.sharedDataService.endIndex = this.endIndex;
  }
}
