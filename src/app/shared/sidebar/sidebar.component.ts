import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() signOut = new EventEmitter<void>();

  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    this.sidebarToggle.emit(this.isSidebarActive);
  }
  onSignOut() {
    localStorage.removeItem('accessToken');
    this.signOut.emit();
  }
}
