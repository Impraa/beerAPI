import { NgModule } from '@angular/core';
import { BeerRoutingModule } from './beer-routing.module';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { BeerState } from './state/beer-state.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [MatSliderModule, MatInputModule,MatSelectModule,MatCheckboxModule,MatButtonModule,BeerRoutingModule, CommonModule, NgxsModule.forFeature([BeerState]), ],
  providers: [],
  bootstrap: [],
})
export class BeerModule {}