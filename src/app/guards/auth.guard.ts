import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return true;
    }

    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

