import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokemonsDetails } from '../models/pokemonsDetails.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private pokemonsDetailsSubject = new Subject<PokemonsDetails[]>();
  pokemonsDetails$ = this.pokemonsDetailsSubject.asObservable();

  setPokemonsDetails(data: PokemonsDetails[]): void {
    this.pokemonsDetailsSubject.next(data);
  }
}
