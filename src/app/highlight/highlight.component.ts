import { PokemonDetails, ResourceService } from './../services/Resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit{
  highlightPokemon:PokemonDetails[] | undefined;
  hightLightLimit:number = 3
  constructor(public resourceService:ResourceService){}

  ngOnInit(): void {
    this.getHighlightsPokemons()
  }

  getHighlightsPokemons(){
    this.resourceService.getPokemonsDetails(this.hightLightLimit).subscribe({
      next:(res)=>{
        this.highlightPokemon = res
      }
    })
  }

}
