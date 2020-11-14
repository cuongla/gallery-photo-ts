import {ThunkAction} from 'redux-thunk';
import {
    SignUpData,
    AuthAction,
    User,
    SET_USER,
    SET_LOADING,
    SIGN_OUT,
    SignInData,
    SET_ERROR,
    NEED_VERIFICATION,
    SET_SUCCESS
} from '../types/authTypes';
import {RootState} from '..';
import firebase from '../../firebase/config';

// Create User
export const signup  = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const res = firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            
            if((await res).user) {
                const userData: User = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    id: (await res).user?.uid!,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }

                await firebase.firestore().collection('/users').doc((await res).user?.uid).set(userData);
                await (await res).user?.sendEmailVerification();

                // dispatching action
                dispatch({
                    type: NEED_VERIFICATION
                });
                dispatch({
                    type: SET_USER,
                    payload: userData
                })
            }
        } catch(err) {
            onError();
            dispatch(setError(err.message))
        }
    }
}

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await firebase.firestore().collection('users').doc(id).get();

            // return user if user is in db
            if(user.exists) {
                const userData = user.data() as User;
                dispatch({
                    type: SET_USER,
                    payload: userData
                })
            }
        }catch(err) {
            console.log(err);
        }
    }
}

// User log in 
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        } catch(err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            })
        } catch(err) {
            console.log(err);
            dispatch(setLoading(false));
        }
    }
}

// Reset password with email
export const sendPasswordResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(successMsg));
        } catch(err) {
            console.log(err);
            dispatch(setError(err.message));
        }
    }
}

// Set verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: NEED_VERIFICATION,
        })
    }
}

// Set Success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        })
    }
}

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        })
    }
}