import { PokemonsDetails } from "../models/pokemonsDetails.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap, tap } from "rxjs";
import { API_URL, EVOLUTION_CHAIN_API_URL, SPECIES_API_URL } from "./endpoints/pokemon-endpoints";

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
export class PokemonService{
  allPokemons: PokemonsDetails[] = [];
  constructor(private http:HttpClient){}

  getPokemonsDetails(limit: number): Observable<PokemonsDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + 'limit=' + limit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonsDetails>[] = res.results.map(
          (pokemon: PokemonList) =>
            this.http.get<PokemonsDetails>(pokemon.url).pipe(
              mergeMap((details: any) =>
                this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name).pipe(
                  map((species: PokemonSpecies) => ({
                    id: details.id,
                    name: details.name,
                    image: details.sprites.other['official-artwork'].front_default,
                    flavorText: species.flavor_text_entries.find(
                      (entry) => entry.language.name === 'en'
                    )?.flavor_text,
                    types: details.types.map((type: any) => ({
                      slot: type.slot,
                      name: type.type.name,
                      url: type.type.url,
                    })),
                  } as PokemonsDetails))
                )
              )
            )
        );
        return forkJoin(pokemonRequests).pipe(
          tap((pokemons: PokemonsDetails[]) => {
            this.allPokemons = pokemons;
          })
        );
      })
    );
  }

  getPokemon(idPokemon:string){
    return this.http.get(API_URL + idPokemon)
  }

  getPokemonSpecie(idPokemon:string){
    return this.http.get(SPECIES_API_URL + idPokemon)
  }

  getPokemonEvolutionChain(idPokemon:string){
    return this.http.get(EVOLUTION_CHAIN_API_URL + idPokemon)
  }


}


