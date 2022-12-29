import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, take, timeout } from 'rxjs';
import { Beer } from 'src/app/modules/beer-module/data/interfaces';
import { FilterBeers, SortBeers, AddBeerToFavouritesAction, RemoveBeerFromFavourites } from '../../state/beer-state.actions';
import { BeerSelector } from '../../state/beer-state.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{
  minAbv: number = 0;
  maxAbv: number = 0;
  abv:number = 0;
  searchValue: string = ''; 
  subscribtions: Subscription[] = [];
  byValue: "name" | "abv" = 'abv';
  type: "asc" | "desc" = 'asc';
  newFavourite: string = ''
  isChecked: boolean = false;
  constructor(private store: Store) {}
  @Select(BeerSelector.getBeers) beers$!: Observable<Beer[]> ;
  @Select(BeerSelector.getIsLoaded) isLoaded$!: Observable<boolean>;
  @Select(BeerSelector.getFavouriteBeers) favouriteBeers$!: Observable<Beer[]>
  filter(){
    this.store.dispatch(new FilterBeers({searchValue:this.searchValue, abv: this.abv}))
  }
  sortDispatch(){
    this.store.dispatch(new SortBeers({ byValue: this.byValue , type: this.type}))
  }
  favouritesDispatch(){
    this.store.dispatch(new AddBeerToFavouritesAction({id: this.newFavourite}))
  }
  removeFavouritesDispatch(){
    this.store.dispatch(new RemoveBeerFromFavourites({id:this.newFavourite}))
  }
  filterAbv(event:any){
    const input = event.target.value;
    this.abv = input
    this.filter()
  }
  filterName(event:any){
    const input = event.target.value;
    this.searchValue = input
    this.filter()
  }
  sort(event:any){
    const input = event.value;
    if(input === 'abv' || input === 'name'){
      this.byValue = input
    }else{
      this.type = input
    }
    this.sortDispatch()
  }
  changeChecked(){
    if(this.isChecked === false){
       this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }
  favourites(id: any){
    if(sessionStorage.getItem(`favourites${id}`) === null){
      sessionStorage.setItem(`favourites${id}`,id);
      const data = sessionStorage.getItem(`favourites${id}`);
      if(data){
        this.newFavourite = data;
         this.favouritesDispatch()
      }
    }
  
  }
  removeFavourites(id:any){
    const data = sessionStorage.getItem(`favourites${id}`);
    sessionStorage.removeItem(`favourites${id}`);
    if(data){
      this.newFavourite = data;
       this.removeFavouritesDispatch()
    }
  }
 ngOnInit(): void {
    const subscription = this.beers$.pipe(
      take(2)
    ).subscribe( (res: Beer[]) => {
       const abvArr = res.map( item => item.abv);
      this.maxAbv = Math.max(...abvArr)
      this.minAbv = Math.min(...abvArr)
    })
    this.subscribtions.push(subscription);
    sessionStorage.clear()
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}