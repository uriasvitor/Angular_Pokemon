import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, mergeMap } from "rxjs";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonLimit = 'limit=3'

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  image: string;
}

@Injectable({
  providedIn:'root'
})
export class ResourceService{
  constructor(private http:HttpClient){}

  getHighlightPokemons(): Observable<PokemonDetails[]> {
    return this.http.get<PokemonList[]>(API_URL + '?' + pokemonLimit).pipe(
      mergeMap((res: any) => {
        const pokemonRequests: Observable<PokemonDetails>[] = res.results.map((pokemon: PokemonList) =>
          this.http.get<PokemonDetails>(pokemon.url).pipe(
            map((details: any) => ({
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default
            } as PokemonDetails))
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
