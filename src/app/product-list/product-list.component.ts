import { Component, OnInit } from  '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  pageTitle: string = "Toms's Products";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = "Observable failed!";

  _listFilter: string;
  get listFilter(): string { // gets values from filter box
    return this._listFilter;
  }
  set listFilter(value: string) { // sets value from filter box to our '_listFilter' variable
    // if listFilter value is empty, return full list of products.
    // if listFilter has something in it, execute function to pull out products from list and sort them into filteredProducts
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products; // JavaScript conditonal operator, If list filter is empty
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private _productService: ProductService) {
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    // return filtered list of Products using JavaScript bult-in 'filter' function
    // extract each product in product array, convert productName to lower case
    // check for index of what is passed in, if index is (-1) indicates it found nothing
  }

  onNotify(message: string): void {
    console.log(message);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
      this.products = products
      this.filteredProducts = this.products;
    },
      error => this.errorMessage = <any>error);
  }

  deleteProduct(id: string): void{
      console.log("Products Are:" + this.products);
      this._productService.deleteProduct(id);
    }
}
