// types

import {bool} from 'prop-types';
import {loginAPI} from '../api/api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {setIsLoggedInAC, setUserIdAC} from './AuthReducer';

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type errorType = string | null


export type appStateType = {
    status: statusType,
    error: errorType,
    isInitialized: boolean
}

export type appActionType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInitializedAC>


// reducer

const initialState: appStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: appStateType = initialState, action: appActionType): appStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR' : {
            return {...state, error: action.error}
        }

        case 'APP/SET-INITIALIZED' : {
            return {...state, isInitialized: action.status}
        }
        default: {
            return state
        }
    }
}


// actions

export const setAppStatusAC = (status: statusType) => ({
    type: 'APP/SET-STATUS', status: status
} as const)

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR', error: error
} as const)

export const setInitializedAC = (status: boolean) => ({
    type: 'APP/SET-INITIALIZED', status
} as const)

// thunks

export const initializeAppTC = (): AppThunk => async (dispatch) => {

    try {
        const res = await loginAPI.initialize()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            dispatch(setIsLoggedInAC(false))
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setInitializedAC(true))

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }

}