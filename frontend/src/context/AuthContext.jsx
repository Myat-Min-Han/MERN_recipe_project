import {React, createContext, useEffect, useReducer} from 'react';
import axios from 'axios'

const AuthContext = createContext()

// action => {type, payload}
const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'log-in': 
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {user: action.payload}
        case 'log-out': 
            localStorage.removeItem('user')
            return {user: null} 
        default: return {user: action.payload}//sign-in
    }
} 

const AuthContextProvider = ({children}) => {

    let [state, dispatch] = useReducer(AuthReducer, {
        user: null
    });

    useEffect(() => {
        try {
            let res = axios.get('/api/user/me')
                console.log(res.data)
                let user = res.data
                if(user) {
                    dispatch({type: 'log-in', payload: user});
                } else {
                    dispatch({type: 'log-out'})
                }
            
        } catch(e) {
            dispatch({type: 'log-out'})
        }

    }, [])


    return <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
};

export {AuthContext, AuthContextProvider};