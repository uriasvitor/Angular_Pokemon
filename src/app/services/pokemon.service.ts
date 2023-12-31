import { PokemonsDetails } from "../models/pokemonsDetails.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap, tap } from "rxjs";
import { API_URL, EVOLUTION_CHAIN_API_URL, SPECIES_API_URL } from "./endpoints/pokemon-endpoints";
import { PokemonList, PokemonSpecies } from "../models/pokemonModels.model";

@Injectable({
  providedIn:'root'
})
export class PokemonService{
  allPokemons: PokemonsDetails[] = [];
  constructor(private http:HttpClient){}

  getHightLight(limit: number): Observable<PokemonsDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + 'limit=' + limit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonsDetails>[] = res.results.map(
          (pokemon: PokemonList) =>
            forkJoin({
              details: this.http.get<PokemonsDetails>(pokemon.url),
              species: this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name)
            }).pipe(
              map((data: any) => ({
                id: data.details.id,
                name: data.details.name,
                image: data.details.sprites.other['official-artwork'].front_default,
                flavorText: data.species.flavor_text_entries.find(
                  (entry: any) => entry.language.name === 'en'
                )?.flavor_text,
              } as PokemonsDetails))
            )
        );
        return forkJoin(pokemonRequests);
      })
    );
  }

  getPokemonsLibrary(limit: number): Observable<PokemonsDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + 'limit=' + limit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonsDetails>[] = res.results.map(
          (pokemon: PokemonList) =>
            forkJoin({
              details: this.http.get<PokemonsDetails>(pokemon.url),
              species: this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name)
            }).pipe(
              map((data: any) => ({
                id: data.details.id,
                name: data.details.name,
                image: data.details.sprites.other['official-artwork'].front_default,
                flavorText: data.species.flavor_text_entries.find(
                  (entry: any) => entry.language.name === 'en'
                )?.flavor_text,
                types: data.details.types.map((type: any) => ({
                  slot: type.slot,
                  name: type.type.name,
                  url: type.type.url,
                })),
              } as PokemonsDetails))
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


