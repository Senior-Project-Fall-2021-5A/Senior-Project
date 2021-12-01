/* 
    Creating reducer function to work with useReducer() 
    Has two action types: One for storing authenticated userUID 
    and one for storing the role of authenticated user
*/


const Reducer = (state, action) => {
    switch (action.type) {
        case 'STORE_AUTH_USERUID':
            return {
                ...state,
                userUID: action.payload
            };
        case 'STORE_AUTH_USER_ROLE':
            return {
                ...state,
                role: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;