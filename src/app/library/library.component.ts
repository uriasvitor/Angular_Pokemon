import { PokemonService } from './../services/pokemon.service';
import { PokemonsDetails } from '../models/pokemonsDetails.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  cardsList: PokemonsDetails[] | undefined;
  tiposPokemon: string[] = [];
  inLoading:boolean = true;
  cardsPerPage = 20;
  cardslimit = 200;
  startIndex = 0;
  endIndex = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    if (!this.cardsList) {
      this.pokemonService.getPokemonsDetails(this.cardslimit).subscribe({
        next: (data) => {
          this.cardsList = data;
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
  }
}
