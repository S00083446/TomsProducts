import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product-list/product';
import { ProductService } from '../shared/product.service';

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

  constructor(private _productService: ProductService) { }

  ngOnInit() {
  }

  // When submit button is clicked, it calls this method 
  // logging our data to console
  addProduct(): void {
    console.log(this.productId);
    console.log(this.productName);
    console.log(this.productCode);
    console.log(this.releaseDate);
    console.log(this.description);
    console.log(this.price);
    console.log(this.starRating);
    console.log(this.imageUrl);

    //Then we create a temporary product to store the data
    // The data is passed in from our inputs using ngModel
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

    // Lastly the we call our service method which will add our product to the colletion of products
    this._productService.addProduct(product);
  }

}
