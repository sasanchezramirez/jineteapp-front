import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewTransactionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule
  ]
})
export class HomeModule { }
