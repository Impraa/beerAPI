import { createSelector, Selector } from '@ngxs/store';
import { BeerState, BeerStateModel } from './beer-state.module';
import { Beer } from '../data/interfaces';

export class BeerSelector {
  @Selector([BeerState])
  static getBeers(state: BeerStateModel, id: string) {
    return state.filteredBeers
  }
  @Selector([BeerState])
  static getFavouriteBeers(state: BeerStateModel, id:string){
    return state.favouriteBeers;
  }
  @Selector([BeerState])
  static getIsLoaded(state: BeerStateModel) {
    return state.loaded;
  }
 
  static getSingleBeer(id: string) {
    return createSelector([BeerState], function(state: BeerStateModel){
      const beer = state.beers.filter((beer:Beer) => {
        return beer.id == id
      })
      return beer[0]
    })
  }
}