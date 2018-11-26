import { Product } from './../product';
import { Action } from '@ngrx/store';

// ! Step-1) Define the action type as named constant using enum
export enum ProductActionTypes {
    TOGGLE_PRODUCT_CODE = '[Product] Toggle the product code action type',
    SET_CURRENT_PRODUCT = '[Product] Set Current Product',
    CLEAR_CURRENT_PRODUCT = '[Product] Clear Current product action',
    INITIALIZE_CURRENT_PRODUCT = '[Product] Initialize the current product action',
    LOAD = '[Product] load/getAll list of products',
    LOAD_SUCCESS = '[Product] list of products fetched sucessfully',
    LOAD_FAIL = '[Product] failed to fetch the list of products'
}

// !another way of defining the constants
// export const TOGGLE_PRODUCT_CODE = '[Product] Toggle the product code action type';
// export const SET_CURRENT_PRODUCT = '[Product] Set Current Product';
// export const CLEAR_CURRENT_PRODUCT = '[Product] Clear Current product action';
// export const INITIALIZE_CURRENT_PRODUCT = '[Product] Initialize the current product action';


// ! Step-2) Build Action Creator
export class ToggleProductCodeAction implements Action {
    readonly type = ProductActionTypes.TOGGLE_PRODUCT_CODE;

    constructor(public payload: boolean) { }
}
export class SetCurrentProductAction implements Action {
    readonly type = ProductActionTypes.SET_CURRENT_PRODUCT;

    constructor(public payload: Product) { }
}
export class ClearCurrentProductAction implements Action {
    readonly type = ProductActionTypes.CLEAR_CURRENT_PRODUCT;

    constructor() { }
}
export class InitializeCurrentProductAction implements Action {
    readonly type = ProductActionTypes.INITIALIZE_CURRENT_PRODUCT;

    // constructor() { } // not needed, empty constructor will written by default
}
export class LoadAction implements Action {
    readonly type = ProductActionTypes.LOAD;
}
export class LoadSuccessAction implements Action {
    readonly type = ProductActionTypes.LOAD_SUCCESS;

    constructor(public payload: Product[]) { }
}
export class LoadFailureAction implements Action {
    readonly type = ProductActionTypes.LOAD_FAIL;

    constructor(public payload: string) { }
}



// ! Step-3) Defining a Union Type for action creator
export type ProductActions = ToggleProductCodeAction
    | SetCurrentProductAction
    | ClearCurrentProductAction
    | InitializeCurrentProductAction
    | LoadAction
    | LoadFailureAction
    | LoadSuccessAction;


