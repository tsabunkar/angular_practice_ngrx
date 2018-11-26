import * as productAction from './../state/product.action';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as  fromProduct from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private store: Store<fromProduct.ApplicationState>, // injecting store in the component
    private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    /*  this.store.pipe(select('products')).subscribe(
       products => {
         // if (products) { // commenting this code- bcoz initialState is defined so we would never get undefined
         this.displayCode = products['showProductCode']; // property of products slice of state.
         // }
       }
     ); */

    // ! Using the concept of SELECTORS to retrieve or fetch the property from slice of state

    this.store.pipe(select(fromProduct.getShowProductCodePropertyFromFeatureSliceOfStateObject)).subscribe(
      showProductCode => this.displayCode = showProductCode // property of products slice of state.
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /*   checkChanged(value: boolean): void {
      this.displayCode = value;
    } */

  // !replacing the above code to ngrx, ie we want to store the displayCode value when use navigatie
  // !backs to this Component
  /* checkChanged(value: boolean): void {
    // !dispatching the action
    console.log(value);
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  } */

  // !USing action action creator while dispatching an action -
  checkChanged(value: boolean): void {
    // !dispatching the action
    this.store.dispatch(new productAction.ToggleProductCodeAction(value));
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
