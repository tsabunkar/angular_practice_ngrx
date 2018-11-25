import { Product } from '../product';
import * as fromRoot from 'src/app/state/app.state'; // importing all, and defining the all
import { createFeatureSelector, createSelector } from '@ngrx/store';
// as(alias) -> fromRoot


// defining the feature slice of state as an interface
/* export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
} */
// ! since products module is lazy loaded module, define the inteface like this-
export interface ApplicationState extends fromRoot.ApplicationState {
    products: ProductState;
}
export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};


// !building a selector
const getProductFeatureSliceState = createFeatureSelector<ProductState>('products');
// 'products' -> feauture slice of state from state tree

export const getShowProductCodePropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.showProductCode // *2nd argum is the property which we want to retrieve from 'products' slice of state
);

export const getProductsPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.products // *2nd argum is the property which we want to retrieve from 'products' slice of state
);

export function reducer(state: ProductState = initialState, action): ProductState {
    // state -> is the stae from the Stores, and action -> is action to be processed which has payload and type

    /*
    console.log('previous state', JSON.stringify(state));
    console.log('previous payload and action', action, action.payload); */
    switch (action.type) { // checking the type prooperty from action object
        case 'TOGGLE_PRODUCT_CODE': {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                showProductCode: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

