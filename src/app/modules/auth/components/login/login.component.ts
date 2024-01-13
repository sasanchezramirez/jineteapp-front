import { Component } from '@angular/core';
import { Login } from '../../models/login.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public login: Login;
  validEmail: boolean = true;
  validPwd: boolean = true;
  isLoading: boolean = false;
  userFound: boolean = true;
  correctPwd: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.login = {
      email: '',
      password: ''
    }
  }

  onLogin(){
    if (this.isEmailValid(this.login.email)) {
      this.isLoading = true;
      this.authService.login(this.login).subscribe(
        response => {
          if (response.success) {
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.router.navigate(['/home'])
          } else {
            this.isLoading = false;
            if (response && response.code === "001") {
              this.userFound = false;
              console.log(response.message);
            }
            if (response && response.code === "002") {
              this.correctPwd = false;
              console.log(response.message);
            }
          }
        }
      );
    } else {
      console.log('Email o contraseña inválidos');
    }
  }

  isEmailValid(email: string){
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      this.validEmail = true
      return this.validEmail;
    } else {
      this.validEmail = false
      return this.validEmail;
    }
  }

}
