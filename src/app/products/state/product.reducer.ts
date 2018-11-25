export function reducer(state, action) {
    // state -> is the stae from the Stores, and action -> is action to be processed which has payload and type

    console.log('previous state', JSON.stringify(state));
    console.log('previous payload and action', action, action.payload);
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
