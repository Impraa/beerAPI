import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Beer } from 'src/app/modules/beer-module/data/interfaces';
import { BeerSelector } from '../../state/beer-state.selector'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {

  id: string = '';
  beer!: Beer;
  subscriptions: Subscription[] = [];


    constructor(private route: ActivatedRoute, private store:Store){}  

    ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id')
    this.id = routeId !== null ? routeId : '';
    const subscription = this.store.select(BeerSelector.getSingleBeer(this.id)).subscribe(beer => { 
      if(beer){
            this.beer=beer;
          }    
    })
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}