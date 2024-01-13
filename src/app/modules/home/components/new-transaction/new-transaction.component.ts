import { Component } from '@angular/core';
import { Jineteo } from '../../models/jineteo.model';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent {
  public jineteo: Jineteo;
  public isSidebarActive = false;
  public activeAccordion: string | null = null;

  constructor(){
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
    }
  }

  toggleAccordion(formId: string) {
    this.activeAccordion = this.activeAccordion === formId ? null : formId;
  }

  handleSidebarToggle(isSidebarActive: boolean){
    this.isSidebarActive = isSidebarActive;
  }

}
