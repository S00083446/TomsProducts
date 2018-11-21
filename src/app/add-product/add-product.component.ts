import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product-list/product';
import { ProductService } from '../shared/product.service';

import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // Creating variables to store data inputted from user
  productId: number;
  productName: string;
  productCode: string;
  description: string;
  releaseDate: string;
  price: number;
  starRating: number;
  imageUrl: string;
  showDisplayClipartComponent: boolean;

  listFilter: string;

  constructor(private _productService: ProductService, private router: Router) { }
  // router will redirect after the form is submitted

  showHideDisplayClipartComponent(): boolean{
    this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
    return false;   // this will hide the display intil it's needed
  }

  addImageStringFormTextBox(evt) : boolean{
    this.imageUrl = evt;
    return false;
  }
  ngOnInit() {
  }

  // When submit button is clicked, it calls this method
  // logging our data to console
  addProduct(): void {
    // console.log(this.productId);
    // console.log(this.productName);
    // console.log(this.productCode);
    // console.log(this.releaseDate);
    // console.log(this.description);
    // console.log(this.price);
    // console.log(this.starRating);
    // console.log(this.imageUrl);

    let product: IProduct = {
      productId: this.productId,
      productName: this.productName,
      productCode: this.productCode,
      releaseDate: this.releaseDate,
      description: this.description,
      price: this.price,
      starRating: this.starRating,
      imageUrl: this.imageUrl,
    };

    // // Then we create a temporary product to store the data
    // // The data is passed in from our inputs using ngModel
    // const product: IProduct = {
    //   productId: this.productId,
    //   productName: this.productName,
    //   productCode: this.productCode,
    //   releaseDate: this.releaseDate,
    //   description: this.description,
    //   price: this.price,
    //   starRating: this.starRating,
    //   imageUrl: this.imageUrl,
    // };

    // Lastly the we call our service method which will add our product to the colletion of products
    this._productService.addProduct(product);
    // This will redirect to the 'product-list component'
    this.router.navigate(['/product-list']);

  }

}
