import { Injectable } from '@angular/core';
import { IProduct } from '../product-list/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // HttpClient onlh available in angular 4
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ProductService {
  // specify URL to products on our web service for fake JSON server
  private _productUrl = 'http://localhost:3000/products';

  // Service wrapper around the native Firestore SDK's
  // CollectionReference and Query types.
  productsCollection: AngularFirestoreCollection<IProduct>;

  // A representation of any set of Products over any amount of time
  products: Observable<IProduct[]>;

  // Array to hold all products
  allProducts: IProduct[];
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    // Connect to database
    this.productsCollection = _afs.collection<IProduct>("products");
    console.log("Adding all products to firestore...")
    // this.addAllProducts();
  }

  getProducts(): Observable<IProduct[]> {// Type of data it's OBSERVING
    // valueChanges() returns the current state of the collection as an
    // Observable of data as a synchronized array of JSON objects.
    //this.products = this.productsCollection.valueChanges();
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IProduct;
        console.log("getProducts:data" + JSON.stringify(data));
        const id = a.payload.doc.id;
        console.log("getProducts:id = " + id);

        return { id, ...data };
      }))
    );

    // As the data is now available as an Observable we can subscribe to it and 
    // Output to the console to have a peek at it
    this.products.subscribe(data => console.log("getProducts" + data));

    return this.products;
    // return this._http.get<IProduct[]>(this._productUrl).pipe (  // IProduct[] specifies the TYPE of response we should get back
    //   tap(data => console.log('All:' + JSON.stringify(data))),
    //   catchError(this.handleError));
  }

  deleteProduct(id: string): void {
    this.productsCollection.doc(id).delete()
      .catch(error => { console.log("deleteProduct error: " + error); })
      .then(() => console.log("deleteProduct: id = "+id ));
  }

  addProduct(product: IProduct): void {
    this.productsCollection.add(product);
  }

  // addAllProducts() {
  //   this._http.get<IProduct[]>(this._productUrl).subscribe(
  //     products => {
  //       this.allProducts = products;
  //       console.log("getProducts" + JSON.stringify(products));
  //       for (let product of this.allProducts) {
  //         console.log("Adding: " + product.productName);
  //         this.productsCollection.add(product);
  //       }
  //     },
  //     error => (this.errorMessage = <any>error)
  //   );
  // }
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);

  }

}
