import React, {createContext, useReducer} from 'react';
import Reducer from './Reducer';

const initialState = {
    userUID: '',
    role: 0
};

const GlobalStore = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
};

export const GlobalContext = createContext(initialState);
export default GlobalStore;