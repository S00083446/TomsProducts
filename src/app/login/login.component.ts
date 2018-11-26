import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  form;
  constructor(private fb: FormBuilder, private myRoute: Router,
    private auth: AuthService) {
      this.form = fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    
  ngOnInit() {
  }

  login() {
    console.log('login: email = ' + this.form.value.email);
      console.log('login: pwd = ' + this.form.value.password);
    this.auth.doLogin(this.form.value)
    .then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
  tryFacebookLogin(){
    this.auth.doFacebookLogin()
    .then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    
    })
  }
  
  
}
 

