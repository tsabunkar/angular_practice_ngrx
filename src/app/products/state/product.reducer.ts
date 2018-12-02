import { Product } from '../product';
import * as fromRoot from 'src/app/state/app.state'; // importing all, and defining the all
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.action';
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
    // currentProduct: Product;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};


// !building a selector
const getProductFeatureSliceState = createFeatureSelector<ProductState>('products');
// 'products' -> feauture slice of state from state tree

export const getShowProductCodePropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.showProductCode // *2nd argum is the property which we want to retrieve from 'products' slice of state
);

export const getCurrentProductIdPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.currentProductId // *2nd argum is the property which we want to retrieve from 'products' slice of state
);

/* export const getCurrentProductPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.currentProduct // *2nd argum is the property which we want to retrieve from 'products' slice of state
); */
export const getCurrentProductPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState,
    getCurrentProductIdPropertyFromFeatureSliceOfStateObject,
    (stateVal, currentProdId) => { // here -> stateVal = getProductFeatureSliceState
        //   and currentProdId = getCurrentProductIdPropertyFromFeatureSliceOfStateObject
        if (currentProdId === 0) {
            return { // new product
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProdId ? stateVal.products.find(p => p.id === currentProdId) : null;
        }
    }
);

export const getProductsArrayPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState, // *1st argum is feature slice of state i.e- 'products'
    state => state.products // *2nd argum is the property which we want to retrieve from 'products' slice of state
);
export const getErrorPropertyFromFeatureSliceOfStateObject = createSelector(
    getProductFeatureSliceState,
    state => state.error
);

/*
export function reducer(state: ProductState = initialState, action): ProductState {
    // state -> is the stae from the Stores, and action -> is action to be processed which has payload and type


    // console.log('previous state', JSON.stringify(state));
    // console.log('previous payload and action', action, action.payload);
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
} */

// !Using strongly typed actions in the reducer function
export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
    // state -> is the stae from the Stores, and action -> is action to be processed which has payload and type

    /*
    console.log('previous state', JSON.stringify(state));
    console.log('previous payload and action', action, action.payload); */
    switch (action.type) { // checking the type prooperty from action object
        case ProductActionTypes.TOGGLE_PRODUCT_CODE: {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                showProductCode: action.payload
            };
        }
        /*   case ProductActionTypes.SET_CURRENT_PRODUCT: {
              return {
                  // return new class state
                  ...state, // getting existing state copy (i.e- previous state)
                  currentProduct: { ...action.payload }
              };
          }
          case ProductActionTypes.CLEAR_CURRENT_PRODUCT: {
              return {
                  // return new class state
                  ...state, // getting existing state copy (i.e- previous state)
                  currentProduct: null
              };
          }
          case ProductActionTypes.INITIALIZE_CURRENT_PRODUCT: {
              return {
                  // return new class state
                  ...state, // getting existing state copy (i.e- previous state)
                  currentProduct: {
                      id: 0,
                      productName: 'default product name',
                      productCode: 'default code',
                      description: 'default decription',
                      starRating: 5
                  }
              };
          } */
        // removing currentProduct object, instead adding another property called productId ->
        case ProductActionTypes.SET_CURRENT_PRODUCT: {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                currentProductId: action.payload.id
            };
        }
        case ProductActionTypes.CLEAR_CURRENT_PRODUCT: {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                currentProductId: null
            };
        }
        case ProductActionTypes.INITIALIZE_CURRENT_PRODUCT: {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                currentProductId: 0 // assigning productId to 0 , saying its new product
            };
        }
        case ProductActionTypes.LOAD_SUCCESS:
            return {
                ...state,
                products: action.payload,
                error: '' // if no error then error property is empty string
            };

        case ProductActionTypes.LOAD_FAIL:
            return {
                ...state,
                products: [], // if we have error then products array is empty
                error: action.payload
            };

        case ProductActionTypes.UPDATE_PRODUCT_SUCCESS:
            const updatedProducts = state.products.map( // using the map method, bcoz -create a new array not mutate the exisitng the array
                productObject => action.payload.id === productObject.id ? action.payload : productObject
            );
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ''
            };

        case ProductActionTypes.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
                currentProductId: action.payload.id,
                error: ''
            };

        case ProductActionTypes.CREATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(prod => prod.id !== action.payload), // apart from deleted product show all the products
                currentProductId: null,
                error: ''
            };

        case ProductActionTypes.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            };

        default: {
            return state;
        }
    }
}

