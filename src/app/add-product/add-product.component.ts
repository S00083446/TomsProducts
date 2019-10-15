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
  showDisplayClipartComponent: boolean ;
  listFilter: string;
  imageStr: string; // added this

  constructor(private _productService: ProductService, private router: Router) { }
  // router will redirect after the form is submitted

  showHideDisplayClipartComponent(): boolean{
    this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
    return false;   // this will hide the display until it is needed
  }

  addImageStringToFormTextBox(evt) : boolean{
    this.imageUrl = evt;
    return false;
  }
  ngOnInit() {
  }

  // When submit button is clicked, it calls this method
  addProduct(): void {
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
    // Lastly then we call our service method which will add our product to the colletion of products
    this._productService.addProduct(product);
    // This will redirect to the 'product-list component'
    this.router.navigate(['/product-list']);
  }
}