import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../components/models/user.model';
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';

const {apiTrainers,apiKey} = environment;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //dependancy injection
  constructor(private readonly http:HttpClient) { }

  public login(username:string): Observable<User>{
    return this.checkUsername(username)
    .pipe(
      switchMap((user:User|undefined)=>{
        if (user === undefined) {//user does not exist
        return this.createUser(username)
      }
      return of(user);
    }),
    tap((user:User)=>{
      StorageUtil.storageSave<User>(StorageKeys.User,user)
    })
    )
    
  }

  //check if user exists
  private checkUsername(username:string):Observable<User | undefined>{
    return this.http.get<User[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      // RxJS Operators
      map((response:User[])=> response.pop())
    )
  }
  // create a user
  private createUser(username:string):Observable<User> {
    const user = {
      username,
      pokemon: []
    };
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key":apiKey
    });
    // post - Create items on the server
    return this.http.post<User>(apiTrainers,user, {
      headers
    })
  }
  
}
