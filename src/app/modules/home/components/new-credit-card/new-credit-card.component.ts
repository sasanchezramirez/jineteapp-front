import { Component } from '@angular/core';
import { CreditCard } from '../../models/credit-card.model';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';

@Component({
  selector: 'app-new-credit-card',
  templateUrl: './new-credit-card.component.html',
  styleUrl: './new-credit-card.component.scss'
})
export class NewCreditCardComponent {
  public isSidebarActive: boolean = false;
  public creditCard!: CreditCard;
  public isLoading: boolean = false;
  public message: string = '';
  public icon: string = '';
  public showModal: boolean = false;
  public userId: string = localStorage.getItem('userId') || '' ;


  constructor(private jinetepService: JineteoService ){
    this.initializeModels();
  }

  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

  initializeModels(){
    this.creditCard = {
      'name': '',
      'availability': 0,
      'userId': Number(localStorage.getItem('userId')),
      'balance': 0,
      'datelineToPay': '0'
    }
  }

  onSubmit(){
    this.creditCard.datelineToPay.toString;
    this.isLoading = true;
    this.jinetepService.newCreditCard(this.creditCard).subscribe({
      next: response => {
        if(response.data){
          this.isLoading = false;
          this.message = 'Credit card created successfully';
          this.showModal = true;
          this.icon = 'assets/icons/bookmark-heart.svg';
          this.initializeModels();
        } else {
          this.isLoading = false;
          this.message = 'Uppss, there was a problem creating your credit card'
          this.showModal = true;
          this.icon = 'assets/icons/emoji-smile-upside-down.svg';
        }
      },
      error: error => {
        this.isLoading = false;
        this.message = 'Uppss, there was a problem creating your credit card'
        this.showModal = true;
        this.icon = 'assets/icons/emoji-smile-upside-down.svg';
      }
    }
    )

  }


}
