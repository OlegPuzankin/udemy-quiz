import axios from 'axios'
import {AUTH_SUCCESS, AUTO_LOGOUT} from "../actionTypes/actionTypes";

const API_KEY = 'AIzaSyBBsFmtI-c5CZnDdvDab1kFgQLz3aH8DHA';

//////////////////////////////////////ACTIONS///////////////////////////////////////////
export const authSuccess =(token)=>({
    type: AUTH_SUCCESS,
    token
});


export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expDate');

    return {type:AUTO_LOGOUT}
};

//////////////////////////////////////THUNKS///////////////////////////////////////////

export const authorizeUser = (authData, isLogin)=>{
    return async dispatch =>{
        debugger

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

        if(isLogin)
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        try{
            const response = await axios.post(url, authData);

            const data =response.data;

            debugger
            const expirationDate = new Date (new Date().getTime() + data.expiresIn*1000);

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expDate', expirationDate);

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
        }
        catch (e) {
            console.log(e);
        }
    }
};

export const autoLogin=()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');

        if(!token)
            dispatch(logout());
        else{
            const expDate = new Date(localStorage.getItem('expDate'));
            if(expDate<= new Date())
                dispatch(logout());
            else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((expDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
};

export const autoLogout = (expDate)=>{
    return dispatch=>{
        setTimeout(()=>dispatch(logout()), expDate*1000)
    }
};