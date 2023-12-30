import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user: User;
  validEmail: boolean = true;
  validPwd: boolean = true;

  constructor() {
    this.user = {
      id: 0,
      email: '',
      pwd: ''
    }
  }

  onLogin(){
    this.isEmailValid(this.user.email);
    this.isPwdValid(this.user.pwd);
    if (this.isEmailValid(this.user.email) && this.isPwdValid(this.user.pwd)) {
      console.log(this.user);
    } else {
      console.log('Invalid Email');
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
    if(pwd == '0406'){
      this.validPwd = true
      return this.validPwd;
    } else {
      this.validPwd = false
      return this.validPwd;
    }
  }
}
