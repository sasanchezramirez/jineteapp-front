import { Component } from '@angular/core';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';
import { CreditCard } from '../../models/credit-card.model';
import { TypeOfJineteo } from '../../models/jineteo.model';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  public isSidebarActive: boolean = false;
  public userId: string = localStorage.getItem('userId') || '';
  public transactionsList: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages!: number;
  public creditCard: CreditCard;
  public creditCardId: number = 0;
  public jinteteoTypeId: number = 0;
  public creditCardsList: CreditCard[] = [];
  public jineteoTypesList: TypeOfJineteo[] = [];





  constructor(private jinetepService: JineteoService){
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
    this.getCreditCard();
    this.getTypesOfJineteo();
    this.getTransactions();
  }
  getCreditCard() {
    this.jinetepService.getCreditCardsById(this.userId).subscribe({
      next: response => {
        if (response.success && response.data && response.data.creditCardDtoList) {
          this.creditCardsList = response.data.creditCardDtoList;
        }
      },
      error: err => console.error('Error fetching credit cards:', err)
    });
  }

  getTypesOfJineteo(){
    this.jinetepService.getTypesOfJineteo().subscribe({
      next: jineteoOptions => {
        if (jineteoOptions.success){
          console.log('Jineteo Types:', jineteoOptions.data.jineteo);
          this.jineteoTypesList = jineteoOptions.data.jineteo;
        } else {
          console.error('It does not find success: ', jineteoOptions);
        }
      },
      error: err => console.error('Error fetching jineteoss:', err)

    })

  }

  getTransactions() {
    this.jinetepService.getTransactionsById(this.userId).subscribe({
      next: response => {
        if(response.success) {
          this.transactionsList = response.data.transactionDtoList.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          this.totalPages = Math.ceil(this.transactionsList.length / this.itemsPerPage);
        }
      },
      error: err => console.error('Error fetching transactions:', err)
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.transactionsList.slice(startIndex, startIndex + this.itemsPerPage);
  }
  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

  getCreditCardName(creditCardId: number): CreditCard | undefined {
    return this.creditCardsList.find(card => card.id === creditCardId);

  }
  getJIneteoType(jineteoTypeId: number): TypeOfJineteo | undefined {
    return this.jineteoTypesList.find(jineteo => jineteo.id === jineteoTypeId);

  }
}
