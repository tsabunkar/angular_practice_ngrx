
// defining the feature slice of state as an interface
export interface UserState {
    showUserName: boolean;

}

const initialState: UserState = {
    showUserName: false
};

export function loginReducer(state = initialState, action): UserState {

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
