import { Component, Output, Input, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() message: string = '';
  @Input() img: string= '';
  @Output() closeEvent = new EventEmitter<void>();

  showModal: boolean = true;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.closeEvent.emit();
  }
}
