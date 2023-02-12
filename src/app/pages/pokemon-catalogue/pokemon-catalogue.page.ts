import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css'],
})
export class PokemonCataloguePage implements OnInit {
  
  navigatePokemons(url:any,jumpNumber:number) {
  this.pokemonCatalogueService.navigatePokemons(url,jumpNumber);  
  }
  
  get user(): User | undefined {
    return this.userService.user;
  }
  get pokemons(): Pokemon {
    
    return this.pokemonCatalogueService.pokemons;
  }
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }
  get error() : string{
    return this.pokemonCatalogueService.error;
  }
  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemons();
  }
}
