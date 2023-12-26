import { PokemonDetails } from '../models/pokemonDetails.model';
import { ResourceService } from './../services/Resource.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit{
  cardsList:PokemonDetails[] | undefined;
  tiposPokemon: string[] = [];
  cardslimit = 200;
  cardsPerPage = 20;
  startIndex = 0;
  endIndex = 0;

  constructor(private resourceService:ResourceService){}

  ngOnInit(): void {
    this.resourceService.getPokemonsDetails(this.cardslimit).subscribe({
      next:(data)=>{
        this.cardsList =  data
        this.endIndex = this.cardsPerPage
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  loadMore(): void {
    this.endIndex += this.cardsPerPage
  }

}
