import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, forkJoin, map, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  pokemonData?: any;
  pokemonSpecie?: any;
  pokemonAbilities?: any;
  pokemonBaseStats?: any;
  pokemonId?:string;
  flavorText?:string;
  typeClass?:string;
  error?:string;
  types?:any;

  constructor(private pokemonService:PokemonService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.paramMap.get('id') || '';
    this.getPokemonDetails(this.pokemonId)
  }

  getPokemonDetails(id: string) {
    forkJoin({
      details: this.pokemonService.getPokemon(id),
      specie: this.pokemonService.getPokemonSpecie(id),
      evolutionchain: this.pokemonService.getPokemonEvolutionChain(id)
    }).pipe(
      catchError((err: any) => {
        console.log(err);
        this.error = 'An error occurred. Please try again later...';
        throw err;
      })
    ).subscribe((data: any) => {

      this.pokemonData = {
        details: data.details,
        abilities: data.abilities,
        specie: data.specie,
        evolutionchain: data.evolutionchain
      };

      this.types = this.pokemonData.details.types.map((type:any)=> type.type.name);
      this.pokemonBaseStats = this.pokemonData.details.stats.map((stats:any)=> stats);
      this.typeClass = this.types[0];
      this.pokemonSpecie = this.pokemonData.specie;
      const flavorTexts = this.pokemonData.specie.flavor_text_entries.map((flavor:any)=> flavor.flavor_text)
      this.flavorText = flavorTexts[0]
    });
  }
}
