export function loginReducer(state, action) {

    switch (action.type) { // checking the type prooperty from action object
        case 'MASK_USER_NAME': {
            return {
                // return new class state
                ...state, // getting existing state copy (i.e- previous state)
                showUserName: action.payload
            };
        }

        default: {
            return state;
        }
    }
}