import { Product } from '../product';
import * as fromRoot from 'src/app/state/app.state'; // importing all, and defining the all
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

export function reducer(state: ProductState, action): ProductState {
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
