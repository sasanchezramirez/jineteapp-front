import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData } from 'chart.js';
import { JineteoService } from 'src/app/services/jineteo/jineteo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public isSidebarActive = false;
  public rogressBarValue = 70;
  public userId: string = localStorage.getItem('userId') || '';

  constructor(private jinetepService: JineteoService ){
  }

  ngOnInit(){
  }


  getTransactions(){
    this.jinetepService.getTransactionsById(this.userId)

  }

  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
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




