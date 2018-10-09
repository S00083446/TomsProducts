import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireeModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // FontAwesomeModule,
    AngularFireeModule.initializeApp(environment.firebase,),
    AngularFirestoreModule,
    //RouterModule.forRoot(routes);
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
