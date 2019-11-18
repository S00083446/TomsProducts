import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as firebase from 'firebase/';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private user: Observable<firebase.User>;
  loggedInStatus = false;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private notifier: NotificationService) {
    this.user = _firebaseAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return firebase.database().ref('users/' + res.user.uid).set({
          email: res.user.email,
          uid: res.user.uid,
          registrationDate: new Date().toString(),
          name: name
        })
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          });
      })
      .catch(err => {
        console.log(err);
        this.notifier.display(true, err.message);
      });
  }

  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }

  doRegister(value) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(value) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise<any>((resolve, reject) => {
      console.log('doLogin: email = ' + value.email);
      console.log('doLogin: pwd = ' + value.password);
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => reject(err));
    });
  }

  // Popup-display method to log into Facebook
  // tslint:disable-next-line: one-line
  doFacebookLogin(){
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise<any>((resolve, reject ) => {
      // tslint:disable-next-line: prefer-const
      let provider = new firebase.auth.FacebookAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      // tslint:disable-next-line: semicolon
      })
    });
  }
  // tslint:disable-next-line: no-trailing-whitespace
  
  doLogout() {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this._firebaseAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
      this.loggedInStatus = false;

    });
  }

  isLoggedIn(): boolean {
      return this.loggedInStatus;
  }
// tslint:disable-next-line: eofline
}