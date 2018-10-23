import { Component, Provider } from '@angular/core';
import { ProductService } from './shared/product.service';
import * as firebase from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "***",
  authDomain: "***",
  databaseURL: "***,"
};
firebase.initializeApp(firebaseConfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'app works';
}
