import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConvertToSpaces } from './shared/convert-to-spaces.pipe';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import {LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  
  MatFormFieldModule,
  // MatLabel,
} from '@angular/material';
import { AuthGuard } from './service/auth.guard';

library.add(faStar);

const routes: Routes = [
  {path: '', redirectTo: 'login',  pathMatch: 'full', canActivate: [AuthGuard] }, // home page
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]  },
  {path: 'add', component: AddProductComponent, canActivate: [AuthGuard]  },
  {path: 'pageNotFound', component: PageNotFoundComponent, canActivate: [AuthGuard]  },
  {path: 'home', component: ProductListComponent, canActivate: [AuthGuard]  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path: '**', redirectTo: 'login', canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    PageNotFoundComponent,
    ConvertToSpaces,
    StarRatingComponent,
    NavComponent,
    LoginComponent,
    NotificationsComponent,
    SignupComponent
  ],
  imports: [ 
    MatFormFieldModule,

    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    // MatLabel,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase,),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    HttpModule,
    FontAwesomeModule
  ],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
