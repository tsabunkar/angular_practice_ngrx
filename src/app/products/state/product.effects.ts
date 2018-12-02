import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }

    // !Effect for GetAll product
    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.LOAD),
        mergeMap((productAction: productActions.LoadAction) => this.productService.getProducts()
            .pipe(
                map((prodsArray: Product[]) => new productActions.LoadSuccessAction(prodsArray)),
                catchError(err => of(new productActions.LoadFailureAction(err))) // exception handling in effects
            )
        )
    );

    // !Effect for update product
    @Effect()
    updateProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UPDATE_PRODUCT),
        map((action: productActions.UpdateProductAction) => action.payload),
        mergeMap((productAction: Product) =>
            this.productService.updateProduct(productAction)
                .pipe(
                    map(updatedProduct => new productActions.UpdateProductSuccessAction(updatedProduct)),
                    catchError(err => of(new productActions.UpdateProductFailAction(err))) // exception handling in effects
                )
        )
    );


    // !Effect for create product
    @Effect()
    createProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CREATE_PRODUCT),
        map((action: productActions.CreateProductAction) => action.payload),
        mergeMap((productAction: Product) =>
            this.productService.createProduct(productAction)
                .pipe(
                    map(newlyCreatedProduct => new productActions.CreateProductSuccessAction(newlyCreatedProduct)),
                    catchError(err => of(new productActions.CreateProductFailAction(err))) // exception handling in effects
                )
        )
    );

    // !Effect for Delete product
    @Effect()
    deleteProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DELETE_PRODUCT),
        map((action: productActions.DeleteProductAction) => action.payload),
        mergeMap((productId: number) =>
            this.productService.deleteProduct(productId)
                .pipe(
                    map(() => new productActions.DeleteProductSuccessAction(productId)),
                    catchError(err => of(new productActions.DeleteProductFailAction(err))) // exception handling in effects
                )
        )
    );
}

