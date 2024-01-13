import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { LoginComponent } from '../auth/components/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new-transaction', component: NewTransactionComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
