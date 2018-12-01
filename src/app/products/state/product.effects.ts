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
}

