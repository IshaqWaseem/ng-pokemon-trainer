import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Pokemon} from '../models/pokemon.model';

const {apiPokemons} = environment
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  
  constructor(private readonly http:HttpClient) { }
  //index starts at 1 since pokeAPI also starts at 1
  private _indexStart:number = 1
  private _pokemons!: Pokemon;
  private _error:string="";
  private _loading:boolean = false;

  get pokemons(): Pokemon {
    return this._pokemons;
  }
  get error(): string {
    return this._error;
  }
  get loading(): boolean {
    return this._loading;
  }
  
  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<Pokemon>(apiPokemons)
    .pipe(
      finalize(()=>{
        this._loading=false;
      })
    )
    .subscribe({
      next:(pokemons:Pokemon) => {
        //adds id property so it can be used to more easily display image and later add or remove pokemon from trainer object
        pokemons["results"]=pokemons.results.map((pokemon,i)=>{return {...pokemon,id:i+1}})
        this._pokemons = pokemons;
      },
      error:(error:HttpErrorResponse)=>{
        this._error=error.message;
      }
    })
  }
  //the buttons send either +20 or -20 in the second parameter, this combined with the index variable lets us navigate
  public navigatePokemons(url:any,jumpNumber:number): void {
    this._loading = true;
    this.http.get<Pokemon>(url)
    .pipe(
      finalize(()=>{
        this._loading=false;
      })
    )
    .subscribe({
      next:(pokemons:Pokemon) => {
        this._indexStart += jumpNumber;
        pokemons["results"] = pokemons.results.map((pokemon, i) => {return {...pokemon, id: i+this._indexStart}})
        this._pokemons = pokemons
      },
      error:(error:HttpErrorResponse)=>{
        this._error=error.message;
      }
    })
  }

}
