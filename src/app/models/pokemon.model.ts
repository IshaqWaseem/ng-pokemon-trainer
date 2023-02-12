export interface Result {
    name: string;
    url: string;
    id:number;
}
export interface Pokemon {
    count:number;
    next:any;
    previous:any;
    results:Result[];
}
