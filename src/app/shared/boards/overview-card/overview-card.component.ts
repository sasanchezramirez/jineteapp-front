import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  standalone: true,
  imports: [],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.scss'
})
export class OverviewCardComponent {
@Input() puntosColombia: number = 0;
@Input() totalLosses: number = 0;

}
