import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NgChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { NewCreditCardComponent } from './components/new-credit-card/new-credit-card.component';
import { MainContentComponent } from 'src/app/shared/main-content/main-content.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewTransactionComponent,
    NewCreditCardComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule,
    SidebarComponent,
    FormsModule,
    ModalComponent,
    LoaderComponent,
    MainContentComponent
  ]
})
export class HomeModule { }
