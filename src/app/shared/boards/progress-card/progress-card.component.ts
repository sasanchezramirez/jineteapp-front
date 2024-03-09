import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.scss'
})
export class ProgressCardComponent {

  @Input() progressBarValue: number = 0;
  @Input() creditCardName: string = '';
  @Input() progressPaymentBarValue: number = 0;
  public radius: number = 45;
  public circumference: number = 2 * Math.PI * this.radius;
  public get progressOffset(): number {
    return this.circumference - (this.progressBarValue / 100) * this.circumference;

  }
  public get paymentProgressOffset(): number {
    return this.circumference - (this.progressPaymentBarValue / 100) * this.circumference;

  }
}
