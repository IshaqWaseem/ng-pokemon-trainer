import { Result } from "./pokemon.model";

export interface User {
    id:number;
    username:string;
    pokemon:Result[];
}