import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public addPokemon(id:number){
    this.userService.add(id);
  }
  
  @Input()
  user!:User|undefined;
  @Input()
  pokemons!: Pokemon;
  constructor (private readonly userService: UserService){

  }
ngOnInit(): void {
  
}
}
