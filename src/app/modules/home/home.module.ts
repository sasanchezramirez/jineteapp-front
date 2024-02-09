import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { NgChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { SidebarComponent } from 'src/app/shared/core/sidebar/sidebar.component';
import { ModalComponent } from 'src/app/shared/utils/modal/modal.component';
import { LoaderComponent } from 'src/app/shared/utils/loader/loader.component';
import { NewCreditCardComponent } from './components/new-credit-card/new-credit-card.component';
import { MainContentComponent } from 'src/app/shared/core/main-content/main-content.component';
import { GeneralInformationComponent } from 'src/app/shared/boards/general-information/general-information.component';
import { ProgressCardComponent } from 'src/app/shared/boards/progress-card/progress-card.component';
import { CalendarCardComponent } from 'src/app/shared/boards/calendar-card/calendar-card.component';
import { OverviewCardComponent } from 'src/app/shared/boards/overview-card/overview-card.component';
import { HeaderComponent } from 'src/app/shared/core/header/header.component';

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
    MainContentComponent,
    GeneralInformationComponent,
    ProgressCardComponent,
    CalendarCardComponent,
    OverviewCardComponent,
    HeaderComponent
  ]
})
export class HomeModule { }
