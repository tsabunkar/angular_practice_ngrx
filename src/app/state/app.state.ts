import { ProductState } from '../products/state/product.reducer';
import { UserState } from '../user/state/login.reducer';

// global interface which defines the complete state of the application (i.e- complete state tree)
export interface ApplicationState {
    // products: ProductState; // If we define the ProductState here, which is spearate bundle/module, we r
    // breaking the principal of lazy loading, i.e- directly accessing decoupled module directly here
    user: UserState; // eagrly loaded module
}
