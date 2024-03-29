import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';


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
  public sendigRegister: boolean = false;
  public message: string = '';
  public icon: string = '';
  public showModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.user = {
      'email': '',
      'password': '',
      'username': '',
      'name': ''
    }
  }

  onRegister() {
    this.isEmailValid(this.user.email)
    this.isPwdValid(this.user.password)
    this.didPwdMatch(this.user.password, this.secondPwd)


    if (this.validEmail && this.validPwd && this.matchPwd) {
      this.sendigRegister = true;
      this.authService.register(this.user).subscribe({
        next: response => {
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('userId', response.data.userId);
          this.router.navigate(['/home'])
          console.log('Registro exitoso', response);
        },
        error: error => {
          this.message = 'Uppss, there was a problem with your register'
          this.showModal = true;
          this.icon = 'assets/icons/emoji-smile-upside-down.svg'
        }
    });
    } else {
      this.message = 'Uppss, there was a problem with your register'
      this.showModal = true;
      this.icon = 'assets/icons/emoji-smile-upside-down.svg'
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
