
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

// *NgRx
import { Store, select } from '@ngrx/store';
import * as  fromProduct from '../state/product.reducer';
import * as productAction from './../state/product.action';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  // errorMessage: string;
  errorMessages$: Observable<string>;

  displayCode: boolean;

  // products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  // componentActive = true;
  products$: Observable<Product[]>;

  constructor(
    private store: Store<fromProduct.ApplicationState>, // injecting store in the component
    private productService: ProductService) { }

  ngOnInit(): void {
    /* this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    ); */
    // !Above code we r subscribing for any event changed happend, this code we r replacing with
    // ! NgRx concept
    this.store.pipe(
      select(fromProduct.getCurrentProductPropertyFromFeatureSliceOfStateObject),
    )
      .subscribe(
        currentProduct => this.selectedProduct = currentProduct
      );



    /*  this.productService.getProducts().subscribe(
       (products: Product[]) => this.products = products,
       (err: any) => this.errorMessage = err.error
     ); */

    // !Using Effects
    this.store.dispatch(new productAction.LoadAction()); // intialzing the LoadAction class

    /*  this.store.pipe(select(fromProduct.getProductsArrayPropertyFromFeatureSliceOfStateObject))
       .subscribe((products: Product[]) => this.products = products); */


    // !Unsubscribing using takeWhile() operator
    /* this.store.pipe(
      select(fromProduct.getProductsArrayPropertyFromFeatureSliceOfStateObject),
      takeWhile(() => this.componentActive) // unsubscribing
    )
      .subscribe((products: Product[]) => this.products = products); */


    // !Unsubscribing using async pipe technique
    // !Using async pipe and beautiful syntax in view -> <div class="card-body" *ngIf="products$ | async as products">
    this.products$ = this.store.pipe(select(fromProduct.getProductsArrayPropertyFromFeatureSliceOfStateObject));
    // .subscribe((products: Product[]) => this.products = products);




    // * handling error -
    this.errorMessages$ = this.store.pipe(select(fromProduct.getErrorPropertyFromFeatureSliceOfStateObject));

    /*  this.store.pipe(select('products')).subscribe(
       products => {
         // if (products) { // commenting this code- bcoz initialState is defined so we would never get undefined
         this.displayCode = products['showProductCode']; // property of products slice of state.
         // }
       }
     ); */

    // ! Using the concept of SELECTORS to retrieve or fetch the property from slice of state

    this.store.pipe(select(fromProduct.getShowProductCodePropertyFromFeatureSliceOfStateObject))
      .subscribe(
        showProductCode => this.displayCode = showProductCode // property of products slice of state.
      );
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();

    // !unsubscribing the effects
    // this.componentActive = false;
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

  // !Using action action creator while dispatching an action -
  checkChanged(value: boolean): void {
    // !dispatching the action
    this.store.dispatch(new productAction.ToggleProductCodeAction(value));
  }

  /* newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  } */
  // !Replacing old techniques with NgRx
  newProduct(): void { // ! here we r dispatching action (i.e- emitting events like we use to do in service concept)
    this.store.dispatch(new productAction.InitializeCurrentProductAction());
  }

  /*   productSelected(product: Product): void {
      this.productService.changeSelectedProduct(product);
    } */
  // !Using NgRx for component communication
  productSelected(product: Product): void { // ! here we r dispatching action (i.e- emitting events like we use to do in service concept)
    this.store.dispatch(new productAction.SetCurrentProductAction(product));
  }

}
