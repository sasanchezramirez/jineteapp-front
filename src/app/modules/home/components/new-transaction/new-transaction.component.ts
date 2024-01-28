import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/jineteo.model';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';
import { CreditCard } from '../../models/credit-card.model';
import { TypeOfJineteo } from '../../models/jineteo.model';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent {
  public jineteo!: Transaction;
  public payment!: Transaction;
  public transaction!: Transaction;
  public creditCardList: CreditCard[] = [];
  public jineteoTypesList: TypeOfJineteo[] = [];
  public isJineteo: boolean = false;
  public isSidebarActive: boolean = false;
  public isLoading: boolean = false;
  public showModal: boolean = false;
  public message: string = '';
  public icon: string = '';
  public transactionCreatedSuccessfully: boolean = false;
  public activeAccordion: string | null = null;
  public userId: string = localStorage.getItem('userId') || '' ;

  constructor(private jinetepService: JineteoService ){
    this.initializeObjects();
  }

  initializeObjects(){
    this.jineteo = {
      'creditCardId': 0,
      'userId': Number(localStorage.getItem('userId')),
      'amount': 0,
      'losses': 0,
      'typeOfTransactionId': 1,
      'typeOfJineteoId': 0,
      'observation': '',
      'date': new Date
    };

    this.payment = {
      'creditCardId': 0,
      'userId': Number(localStorage.getItem('userId')),
      'amount': 0,
      'losses': 0,
      'typeOfTransactionId': 2,
      'observation': '',
      'date': new Date
    };

    this.transaction = {
      'creditCardId': 0,
      'userId': 0,
      'amount': 0,
      'losses': 0,
      'typeOfTransactionId': 0,
      'typeOfJineteoId': 0,
      'observation': '',
      'date': new Date
    };
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


  sendNewTransaction(transaction: Transaction ){
    if(transaction.typeOfTransactionId == 1){
      this.transaction = this.jineteo
      console.log("It is a jineteo")
    }
    if (transaction.typeOfTransactionId == 2){
      console.log("It is a payment")
      this.transaction = this.payment
    }
    this.transaction.date.toString;
    this.isLoading = true;
    this.jinetepService.sendNewtransaction(this.transaction).subscribe(
      responseNewTransaction => {
        if (responseNewTransaction.data){
          this.initializeObjects();
          this.isLoading = false;
          this.transactionCreatedSuccessfully = true;
          this.message = 'Transaction created successfully';
          this.showModal = true;
          this.icon = 'assets/icons/bookmark-heart.svg'
        } else {
          this.initializeObjects();
          this.isLoading = false;
          this.transactionCreatedSuccessfully = false;
          this.message = 'There was a problem trynt to create your transaction';
          this.showModal = true;
          this.icon = 'assets/icons/emoji-smile-upside-down.svg'
        }
      },
      error => {
        console.error('There was an error sending the transaction: ', error);
      }
    )
  }

}
