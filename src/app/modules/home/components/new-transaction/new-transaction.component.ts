import { Component, OnInit } from '@angular/core';
import { Jineteo } from '../../models/jineteo.model';
import { Payment } from '../../models/payment.model';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';
import { CreditCard } from '../../models/credit-card.model';
import { TypeOfJineteo } from '../../models/jineteo.model';
@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent {
  public jineteo: Jineteo;
  public payment: Payment;
  public creditCardList: CreditCard[] = [];
  public jineteoTypesList: TypeOfJineteo[] = [];
  public isSidebarActive = false;
  public activeAccordion: string | null = null;
  public userId: string = localStorage.getItem('userId') || '' ;

  constructor(private jinetepService: JineteoService ){
    this.jineteo = {
      'id': 0,
      'creditCardId': 0,
      'userId': 0,
      'amount': 0,
      'misses': 0,
      'typeOfTransactionId': 0,
      'typeOfJineteoId': 0,
      'observation': '',
      'date': new Date
    },
    this.payment = {
      'id': 0,
      'creditCardId': 0,
      'userId': 0,
      'amount': 0,
      'observation': '',
      'date': new Date
    }

  }

  ngOnInit(){
    this.jinetepService.getCreditCardsById(this.userId).subscribe(
      creditCardOptions => {
        if (creditCardOptions.success){
          console.log('Credit Cards:', creditCardOptions.data.creditCardDtoList);
          this.creditCardList = creditCardOptions.data.creditCardDtoList;
        } else {
          console.error('It does not find success: ', creditCardOptions);
        }
      },
      error => {
        console.error('There was an error getting your credit cards: ', error);
      },
    )
    this.jinetepService.getTypesOfJineteo().subscribe(
      jineteoOptions => {
        if (jineteoOptions.success){
          console.log('Jineteo Types:', jineteoOptions.data.jineteo);
          this.jineteoTypesList = jineteoOptions.data.jineteo;
        } else {
          console.error('It does not find success: ', jineteoOptions);
        }
      },
      error => {
        console.error('There was an error getting jineteo types: ', error);
      }
    )
  }

  toggleAccordion(formId: string) {
    this.activeAccordion = this.activeAccordion === formId ? null : formId;
  }

  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

}
