// pokemon.service.ts

import { Injectable } from "@angular/core";
import { Observable, forkJoin, tap } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { API_URL, EVOLUTION_CHAIN_API_URL, SPECIES_API_URL } from "./endpoints/pokemon-endpoints";
import { PokemonList, PokemonSpecies } from "../models/pokemonModels.model";
import { PokemonsDetails } from "../models/pokemonsDetails.model";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  allPokemons: PokemonsDetails[] = [];

  constructor(private http: HttpClient) {}

  getPokemonsDetails(limit: number): Observable<PokemonsDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + "?" + "limit=" + limit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonsDetails>[] = res.results.map(
          (pokemon: PokemonList) =>
            forkJoin({
              details: this.http.get<PokemonsDetails>(pokemon.url),
              species: this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name),
            }).pipe(
              map((data: any) => ({
                id: data.details.id,
                name: data.details.name,
                image: data.details.sprites.other["official-artwork"].front_default,
                flavorText: data.species.flavor_text_entries.find(
                  (entry: any) => entry.language.name === "en"
                )?.flavor_text,
                types: data.details.types.map((type: any) => ({
                  slot: type.slot,
                  name: type.type.name,
                  url: type.type.url,
                })),
              } as PokemonsDetails)),
              tap((pokemonDetails: PokemonsDetails) => {
                console.log(`Detalhes do Pokémon ${pokemonDetails.name}:`, pokemonDetails);
              })
            )
        );
        return forkJoin(pokemonRequests).pipe(
          tap((pokemons: PokemonsDetails[]) => {
            console.log("Todos os Pokémon detalhados:", pokemons);
            this.allPokemons = pokemons;
          })
        );
      })
    );
  }

  getPokemon(idPokemon: string): Observable<any> {
    return this.http.get(API_URL + idPokemon);
  }

  getPokemonSpecie(idPokemon: string): Observable<any> {
    return this.http.get(SPECIES_API_URL + idPokemon);
  }

  getPokemonEvolutionChain(idPokemon: string): Observable<any> {
    return this.http.get(EVOLUTION_CHAIN_API_URL + idPokemon);
  }
}
