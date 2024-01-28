import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';
import { CreditCard } from '../../models/credit-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public creditCard: CreditCard;
  public isSidebarActive = false;
  public progressBarValue: number = 0;
  public creditCardId: number = 0;
  public userId: string = localStorage.getItem('userId') || '';

  constructor(private jinetepService: JineteoService ){
    this.creditCard ={
      'availability': 0,
      'balance': 0,
      'datelineToPay': '',
      'id': 0,
      'name': '',
      'userId': 0
    }
  }

  ngOnInit(){
    this.getTransactions();
    this.getCreditCard();
  }

  getTransactions(){
    this.jinetepService.getTransactionsById(this.userId).subscribe({
      next: response => {
        if(response.success){
          localStorage.setItem('TransactionsList', JSON.stringify(response.data))
        }
      }
    })
  }

  getCreditCard() {
    this.jinetepService.getCreditCardsById(this.userId).subscribe({
      next: response => {
        if (response.success && response.data && response.data.creditCardDtoList && response.data.creditCardDtoList.length > 0) {
          const firstCard = response.data.creditCardDtoList[0];
          this.creditCard = firstCard;
          this.creditCardId = Number(firstCard.id);
          const cardKey = `CreditCard_${firstCard.id}`;
          localStorage.setItem(cardKey, JSON.stringify(firstCard));
          this.updateProgressBar();
        }
      }
    });
  }


  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

  updateProgressBar() {
    const transactionsList = JSON.parse(localStorage.getItem('TransactionsList') || '{}').transactionDtoList || [];
    const totalTransactions = transactionsList.reduce((acc: number, transaction: { amount: number; losses?: number }) => acc + transaction.amount - (transaction.losses || 0), 0);

    const creditCardData = JSON.parse(localStorage.getItem(`CreditCard_${this.creditCardId}`) || '{}');
    console.log(this.creditCardId); // Bueno para depuración
    if (creditCardData && creditCardData.balance > 0) {
      this.progressBarValue = Math.min((totalTransactions / creditCardData.balance) * 100, 100);
    } else {
      this.progressBarValue = 0;
    }
  }



  pieChartData: ChartData<'pie'> = {
    datasets: [{
      data: [120, 150, 180, 90],
      backgroundColor: [
        'rgba(255, 255, 255, 0.8)', // Blanco
        'rgba(255, 255, 255, 0.8)', // Blanco
        'rgba(255, 255, 255, 0.8)', // Blanco
        'rgba(255, 255, 255, 0.8)'  // Blanco
      ],
      hoverBackgroundColor: [ // Colores al pasar el mouse (opcional)
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ]
    }]
  };
  pieChartType: ChartType = 'pie';

}




