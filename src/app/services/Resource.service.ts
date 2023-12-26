import { PokemonDetails } from "../models/pokemonDetails.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap, tap } from "rxjs";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

@Injectable({
  providedIn:'root'
})
export class ResourceService{
  allPokemons: PokemonDetails[] = [];
  constructor(private http:HttpClient){}

  getPokemonsDetails(limit: number): Observable<PokemonDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + 'limit=' + limit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonDetails>[] = res.results.map(
          (pokemon: PokemonList) =>
            this.http.get<PokemonDetails>(pokemon.url).pipe(
              mergeMap((details: any) =>
                this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name).pipe(
                  map((species: PokemonSpecies) => ({
                    id: details.id,
                    name: details.name,
                    image: details.sprites.other['official-artwork'].front_default,
                    flavorText: species.flavor_text_entries.find(
                      (entry) => entry.language.name === 'en'
                    )?.flavor_text,
                    stats: details.stats.map((stat: any) => ({
                      name: stat.stat.name,
                      baseStat: stat.base_stat,
                      effort: stat.effort,
                      url: stat.stat.url,
                    })),
                    types: details.types.map((type: any) => ({
                      slot: type.slot,
                      name: type.type.name,
                      url: type.type.url,
                    })),
                    weight: details.weight,
                  } as PokemonDetails))
                )
              )
            )
        );
        return forkJoin(pokemonRequests).pipe(
          tap((pokemons: PokemonDetails[]) => {
            this.allPokemons = pokemons;
          })
        );
      })
    );
  }


  getPokemon(name:string){
    return this.http.get(API_URL + name)
  }

  getPokemonsLimited(startIndex: number, endIndex: number): PokemonDetails[] {
    return this.allPokemons.slice(startIndex, endIndex);
  }

}
export { PokemonDetails };

