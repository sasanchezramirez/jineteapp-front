import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NewCreditCardComponent } from './components/new-credit-card/new-credit-card.component';
import { HistorialComponent } from './components/historial/historial.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'new-transaction', component: NewTransactionComponent, canActivate: [AuthGuard]},
  {path: 'new-credit-card', component: NewCreditCardComponent, canActivate: [AuthGuard]},
  {path: 'historial', component: HistorialComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
