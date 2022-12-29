export class RemoveBeerFromFavourites{
  static readonly type = '[Beer] Remove from favorites';
    constructor(public payload: {id: string}){};
}
export class AddBeerToFavouritesAction {
    static readonly type = '[Beer] Add to favorites';
    constructor(public payload: {id: string}){};
  }
  export class FilterBeers {
    static readonly type = '[Beer] filter beer';
    constructor(public payload: { searchValue: string; abv: number }) {}
  }
  export class SortBeers{
      static readonly type = '[Beer] sort beer';
      constructor(public payload: { byValue: 'name' | 'abv'; type: 'asc' | 'desc'}) {}
  }