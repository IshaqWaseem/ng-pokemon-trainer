import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user?: User;

  get user(): User | undefined {
    return this._user
  }
  set user(user:User | undefined){
    StorageUtil.storageSave<User>(StorageKeys.User,user!);
    this._user = user;
  }

  constructor() { 
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
  
  }
}
