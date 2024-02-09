import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-calendar-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-card.component.html',
  styleUrl: './calendar-card.component.scss'
})
export class CalendarCardComponent {
@Input() currentMonth: Date = new Date;
@Input() dayBackgroundColor: number = 0;
@Input() weekDays: any[] = [];
@Input() daysInMonth: any[] = [];
}
