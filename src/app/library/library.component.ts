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
  startIndex = 0;
  cardsPerPage = 20;
  cardslimit = 151;

  constructor(private resourceService:ResourceService){}

  ngOnInit(): void {
    this.resourceService.getPokemonsDetails(this.cardslimit).subscribe({
      next:()=>{
        this.loadCards()
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  loadCards():void{
    const endIndex = this.startIndex + this.cardsPerPage
    this.cardsList = this.resourceService.getPokemonsLimited(this.startIndex, endIndex)
    console.log(this.cardsList)
  }

  loadMore(): void {
    const totalCards = 151;

    if (this.startIndex >= totalCards) {
      return;
    }

    if (this.startIndex + this.cardsPerPage > totalCards) {
      this.cardsPerPage = totalCards - this.startIndex;
    }

    this.loadCards();
    this.startIndex += this.cardsPerPage;
  }

}
