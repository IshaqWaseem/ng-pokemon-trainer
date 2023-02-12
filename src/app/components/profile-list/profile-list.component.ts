import { Component, Input } from '@angular/core';
import { Result } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  //sends the pokemon object to userService so it can be removed
  public removePokemon(pokemon:Result){
    this.userService.remove(pokemon);
  }
  @Input()
  user!:User|undefined;
  constructor(private readonly userService: UserService){}
}
