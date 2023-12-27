import { PokemonsDetails } from '../models/pokemonsDetails.model';
import { PokemonService } from '../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit{
  highlightPokemon:PokemonsDetails[] | undefined;
  hightLightLimit:number = 3
  constructor(public pokemonService:PokemonService){}

  ngOnInit(): void {
    this.getHighlightsPokemons()
  }

  getHighlightsPokemons(){
    this.pokemonService.getPokemonsDetails(this.hightLightLimit).subscribe({
      next:(res)=>{
        this.highlightPokemon = res
      }
    })
  }

}
