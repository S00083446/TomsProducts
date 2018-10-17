import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
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


library.add(faStar);

const routes: Routes = [
  {path: '', redirectTo: 'home',  pathMatch: 'full'}, // home page
  {path: 'home', component: ProductListComponent },
  {path: 'add', component: AddProductComponent },
  {path: 'pageNotFound', component: PageNotFoundComponent },
  {path: 'pageNot', redirectTo: 'pageNotFound' },
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    PageNotFoundComponent,
    ConvertToSpaces,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
