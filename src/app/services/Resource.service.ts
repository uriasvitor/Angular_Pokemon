import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap } from "rxjs";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
const highLightLimit = '3'

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  image: string;
  flavorText:string;
}

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

@Injectable({
  providedIn:'root'
})
export class ResourceService{
  constructor(private http:HttpClient){}


  // getVersionOnePokemon(limit:number):Observable<PokemonDetails[]>{
  //   return this.http.get<PokemonList[]>(API_URL + '?' + "limit=" + limit)
  // }

  getHighlightPokemons(): Observable<PokemonDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + "limit=" + highLightLimit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonDetails>[] = res.results.map((pokemon: PokemonList) =>
          this.http.get<PokemonDetails>(pokemon.url).pipe(
            mergeMap((details: any) =>
              this.http.get<PokemonSpecies>(SPECIES_API_URL + pokemon.name).pipe(
                map((species: PokemonSpecies) => ({
                  name: details.name,
                  image: details.sprites.other["official-artwork"].front_default,
                  speciesUrl: SPECIES_API_URL + pokemon.name,
                  flavorText: species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text,
                } as PokemonDetails))
              )
            )
          )
        );

        return forkJoin(pokemonRequests);
      })
    );
  }

  getPokemon(name:string){
    return this.http.get(API_URL + name)
  }



}
