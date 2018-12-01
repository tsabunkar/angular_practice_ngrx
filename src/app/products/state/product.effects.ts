import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.LOAD),
        mergeMap((productAction: productActions.LoadAction) => this.productService.getProducts()
            .pipe(
                map((prodsArray: Product[]) => new productActions.LoadSuccessAction(prodsArray)),
                catchError(err => of(new productActions.LoadFailureAction(err))) // exception handling in effects
            )
        )
    );
}

