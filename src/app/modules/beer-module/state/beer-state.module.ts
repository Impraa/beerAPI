import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { Beer } from "../data/interfaces";
import { GetDataService } from "../services/get-data.service";
import { AddBeerToFavouritesAction, FilterBeers, RemoveBeerFromFavourites, SortBeers,  } from './beer-state.actions';

export class BeerStateModel{
    beers:Beer[] = []
    filteredBeers:Beer[] = [];
    favouriteBeers: Beer[] = [];
    loaded:boolean = false;
}
@State<BeerStateModel>({
    name:'beer',
    defaults: {
        loaded: false,
        favouriteBeers:[],
        beers: [],
        filteredBeers: []
    }
})
@Injectable()
export class BeerState implements NgxsOnInit{
    constructor(private getDataService: GetDataService){}

    ngxsOnInit(ctx: StateContext<BeerStateModel>): void {
        this.getDataService.getData().subscribe(res => {
            ctx.setState({
                beers:res,
                loaded:true,
                filteredBeers:res,
                favouriteBeers:[]
            })
        })
    }
    @Action(FilterBeers)
    filterBeers(ctx: StateContext<BeerStateModel>, action: FilterBeers) {
        const beers = ctx.getState().beers
        ctx.patchState({
            filteredBeers: beers.filter(beer => {return beer.name.toLowerCase().includes(action.payload.searchValue.toLowerCase()) && beer.abv >= action.payload.abv})
        })
    }

    @Action(AddBeerToFavouritesAction)
    addBeerToFav(ctx: StateContext<BeerStateModel>, action: AddBeerToFavouritesAction){
        const beers = ctx.getState().beers
        ctx.patchState({
            favouriteBeers: [...ctx.getState().favouriteBeers,...beers.filter(beer => {return beer.id == action.payload.id})]
        })
    }

    @Action(RemoveBeerFromFavourites)
    removeBeerFromFav(ctx: StateContext<BeerStateModel>, action: AddBeerToFavouritesAction){
        ctx.patchState({
            favouriteBeers: [...ctx.getState().favouriteBeers.filter(item => {return item.id != action.payload.id})]
        })
    }

    @Action(SortBeers)
    sortBeer(ctx: StateContext<BeerStateModel>, action: SortBeers) {
        const beers = ctx.getState().filteredBeers
        const sortByValue = action.payload.byValue;
        const sortByType = action.payload.type;
        if(sortByValue === 'name'){
            if(sortByType === 'asc'){
             beers.sort(function(a,b) {
                if(a.name < b.name){return -1}
                if(a.name > b.name){return 1}
                return 0;
            })
            }else{
                beers.sort(function(a,b) {
                    if(a.name < b.name){return 1}
                    if(a.name > b.name){return -1}
                    return 0;
                })
            }
        }
        else{
            if(sortByType === 'asc'){
                beers.sort(function(a,b) {
                    return a.abv - b.abv;
               })
               }else{
                beers.sort(function(a,b) {
                    return b.abv - a.abv;
               })
               }
        }
    }
}