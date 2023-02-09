export interface Result {
    name: string;
    url: string;
}
export interface Pokemon {
    count:number;
    next:any;
    previous:any;
    results:Result[];
}
