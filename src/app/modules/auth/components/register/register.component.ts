import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../../../services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public user: User;
  public secondPwd: string = '';
  public validEmail: boolean = true;
  public validPwd: boolean = true;
  public matchPwd: boolean = true;

  constructor(private authService: AuthService) {
    this.user = {
      'id': 0,
      'email': '',
      'pwd': '',
      'username': ''
    }
  }

  onRegister() {
    this.isEmailValid(this.user.email)
    this.isPwdValid(this.user.pwd)
    this.didPwdMatch(this.user.pwd, this.secondPwd)

    if (this.validEmail && this.validPwd && this.matchPwd) {
      this.authService.register(this.user).subscribe({
        next: response => {
          console.log('Registro exitoso', response);
        },
        error: error => {
          console.error('Error en el registro', error);
        }
    });
    } else {
      console.log('Validación fallida');
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

  isPwdValid(pwd: string){
    if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(pwd)){
      this.validPwd = true
      return this.validPwd;
    } else {
      this.validPwd = false
      return this.validPwd;
    }
  }

  didPwdMatch(pwd1: string, pwd2: string){
    if (pwd1 == pwd2){
      this.matchPwd = true
      return this.matchPwd;
    } else {
      this.matchPwd = false
      return this.matchPwd;
    }
  }
}
