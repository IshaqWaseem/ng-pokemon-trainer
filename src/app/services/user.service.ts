import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';
import { environment } from 'src/environments/environment';
import { Result } from '../models/pokemon.model';
const {apiTrainers,apiKey} = environment;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user?: User;

  get user(): User | undefined {
    return this._user
  }
  remove(pokemon:Result):void{
    if(!this._user){
      return}
    fetch(`${apiTrainers}/${this.user?.id}`, {
      method: 'PATCH', // NB: Set method to PATCH
      headers: {
          'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          // Provide new Pokémon to add trainer with id 1
          pokemon: this._user.pokemon.filter(p=>p.id!==pokemon.id) 
      })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not update trainer')
    }
    return response.json()
  })
  .then(updatedTrainer => {
    StorageUtil.storageSave<User>(StorageKeys.User,updatedTrainer!);
    this._user=updatedTrainer;
  })
  .catch(error => {
  })
    
  }
  add(pokemon:Result):void{
    if(!this._user){
      return}
    fetch(`${apiTrainers}/${this.user?.id}`, {
      method: 'PATCH', // NB: Set method to PATCH
      headers: {
          'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          // Provide new Pokémon to add trainer with id 1
          pokemon: [...this._user.pokemon,pokemon] 
      })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not update trainer')
    }
    return response.json()
  })
  .then(updatedTrainer => {
    StorageUtil.storageSave<User>(StorageKeys.User,updatedTrainer!);
    this._user=updatedTrainer;
  })
  .catch(error => {
  })
    
  }


  set user(user:User | undefined){
    StorageUtil.storageSave<User>(StorageKeys.User,user!);
    this._user = user;
  }

  constructor() { 
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
  
  }
}
