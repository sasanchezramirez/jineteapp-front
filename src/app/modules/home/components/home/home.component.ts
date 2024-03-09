import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public progressPaymentBarValue: number = 0;
  public creditCardId: number = 0;
  public userId: string = localStorage.getItem('userId') || '';
  public puntosColombia: number = 0;
  public totalLosses: number = 0;
  public daysInMonth: any[] = [];
  public transactionDays: Set<number> = new Set();
  public currentMonth = new Date();
  public weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  public dailyPaymentAmount: number = 0;
  public paymentPlan: { [key: number]: number } = {};



  constructor(private jinetepService: JineteoService, private cdr: ChangeDetectorRef ){
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
    this.updatePuntosColombia();
    this.updateLosses();
  }

  getTransactions(){
    this.jinetepService.getTransactionsById(this.userId).subscribe({
      next: response => {
        if(response.success){
          localStorage.setItem('TransactionsList', JSON.stringify(response.data))
        }
      }
    })
    this.getCreditCard();

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
          this.determineCalendarMonth();
          this.updatePaymentProgressBar();
        }
      }
    });
  }


  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

  updateProgressBar() {
    const transactionsList = JSON.parse(localStorage.getItem('TransactionsList') || '{}').transactionDtoList || [];
    const currentMonth = new Date().getMonth() + 1; // Mes actual (Enero = 1, Diciembre = 12)
    const currentYear = new Date().getFullYear(); // Año actual
    const filteredTransactions = transactionsList.filter((transaction: any)  => {
      const transactionMonth = new Date(transaction.date).getMonth() + 1;
      const transactionYear = new Date(transaction.date).getFullYear();
      return transactionMonth === currentMonth && transactionYear === currentYear;
    });
    const totalTransactions = filteredTransactions.reduce((acc: number, transaction: { amount: number; losses?: number }) => acc + transaction.amount - (transaction.losses || 0), 0);

    const creditCardData = JSON.parse(localStorage.getItem(`CreditCard_${this.creditCardId}`) || '{}');
    console.log(this.creditCardId);
    if (creditCardData && creditCardData.balance > 0) {
      this.progressBarValue = Math.round((totalTransactions / creditCardData.balance) * 100 * 100) / 100;
    } else {
      this.progressBarValue = 0;
    }
  }

  updatePaymentProgressBar(){
    const balance = this.creditCard.balance;
    const availability = this.creditCard.availability;
    console.log(balance, availability);

    if (this.creditCard.balance && this.creditCard.availability > 0){
      this.progressPaymentBarValue = Math.round(((availability - balance)/availability) * 100 * 100) / 100;
    } else {
      this.progressPaymentBarValue = 0;
    }
  }

  updatePuntosColombia(){
    const transactionsList = JSON.parse(localStorage.getItem('TransactionsList') || '{}').transactionDtoList || [];
    const filteredTransactions = transactionsList.filter((transaction: { typeOfTransactionId: number }) => transaction.typeOfTransactionId === 1);
    const totalAmount = filteredTransactions.reduce((acc: number, transaction: { amount: number }) => acc + transaction.amount, 0);

    this.puntosColombia = Math.round((totalAmount / 3300) * 6);
  }

  updateLosses(){
    const transactionsList = JSON.parse(localStorage.getItem('TransactionsList') || '{}').transactionDtoList || [];
    const filteredTransactions = transactionsList.filter((transaction: { typeOfTransactionId: number }) => transaction.typeOfTransactionId === 1);
    const totalAmount = filteredTransactions.reduce((acc: number, transaction: { losses: number }) => acc + transaction.losses, 0);

    this.totalLosses = totalAmount;
  }

  generateCalendarDays(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Día de la semana del primer día del mes (0 = Domingo, 6 = Sábado)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de días en el mes

    // Calculando el desplazamiento para el inicio del mes.
    // +6 % 7 asegura que el Lunes (1) sea 0 y el Domingo (0) sea 6.
    const offset = (firstDayOfMonth + 6) % 7;

    this.daysInMonth = [];

    // Añadir días "vacíos" al inicio para que el día 1 comience en el día correcto de la semana
    for (let i = 0; i < offset; i++) {
        this.daysInMonth.push({ date: null, isTransactionDay: false, backgroundColor: '' });
    }

    // Llenando el calendario con los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        let backgroundColor = '';

        // Aquí tu lógica para determinar si es un día de transacción y su color
        if (this.transactionDays.has(day)) {
            const paymentAmount = this.getPaymentAmountForDay(dayDate);
            backgroundColor = this.getBackgroundColor(paymentAmount);
        }

        this.daysInMonth.push({
            date: dayDate,
            isTransactionDay: this.transactionDays.has(day),
            backgroundColor: backgroundColor
        });
    }

    this.cdr.detectChanges();
}





getPaymentAmountForDay(date: Date): number {
  if (!date) return 0;

  const dayOfMonth = date.getDate();
  const paymentAmount = this.paymentPlan[dayOfMonth] || 0;

  console.log(`DayOfMonth: ${dayOfMonth}, PaymentAmount: ${paymentAmount}`);

  return paymentAmount;
}




  getBackgroundColor(paymentAmount: number): string {
    if (paymentAmount > 3500000) return 'red';
    else if (paymentAmount > 2000000) return 'orange';
    else return 'green';
  }



  calculatePaymentPlan() {
    const today = new Date();
    const currentDay = today.getDate();
    const creditCardData = JSON.parse(localStorage.getItem(`CreditCard_${this.creditCardId}`) || '{}');
    const datelineToPay = creditCardData.datelineToPay;

    console.log(`Current Day: ${currentDay}, DatelineToPay: ${datelineToPay}`);

    let deadlineDay;

    if (currentDay > datelineToPay) {
        deadlineDay = new Date(today.getFullYear(), today.getMonth() + 1, datelineToPay);
        console.log(`Calculating for next month, deadlineDay: ${deadlineDay}`);
    } else {
        deadlineDay = new Date(today.getFullYear(), today.getMonth(), datelineToPay);
        console.log(`Calculating for current month, deadlineDay: ${deadlineDay}`);
    }

    // Si es después del 17, calcular los días de transacción desde el 1 hasta el 15 del siguiente mes
    if (currentDay > datelineToPay) {
      this.transactionDays.clear(); // Limpiar los días de transacción anteriores

      for (let day = 1; day <= datelineToPay; day++) {
        this.transactionDays.add(day); // Agregar días del 1 al 15
      }
    } else {
      // Calcula los días restantes hasta la fecha límite para este mes
      const daysRemaining = Math.round((deadlineDay.getTime() - today.getTime()) / (1000 * 3600 * 24));

      this.transactionDays.clear(); // Limpiar los días de transacción anteriores

      for (let i = 0; i < daysRemaining; i++) {
        const transactionDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        if (transactionDay <= deadlineDay) {
          this.transactionDays.add(transactionDay.getDate());
        }
      }
    }



    const totalBalance = this.creditCard.balance; // Asegúrate de que este valor esté actualizado
    const daysToPay = this.transactionDays.size; // Número de días en los que se realizarán pagos
    const dailyPayment = totalBalance / daysToPay; // Monto de pago diario

    this.paymentPlan = {}; // Reinicia el plan de pagos

    this.transactionDays.forEach(day => {
        this.paymentPlan[day] = dailyPayment; // Asigna el monto de pago diario a cada día de transacción
    });

    // No olvides llamar a generateCalendarDays para refrescar el calendario con los nuevos datos
    this.generateCalendarDays(this.currentMonth);
}


  determineCalendarMonth() {
    const today = new Date();
    const currentDay = today.getDate();
    const creditCardData = JSON.parse(localStorage.getItem(`CreditCard_${this.creditCardId}`) || '{}');
    const datelineToPay = creditCardData.datelineToPay;
    console.log("primer dateline: ", datelineToPay)


    if (currentDay > datelineToPay) {
      this.currentMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    } else {
      this.currentMonth = new Date(today.getFullYear(), today.getMonth());
    }

    this.calculatePaymentPlan();

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




