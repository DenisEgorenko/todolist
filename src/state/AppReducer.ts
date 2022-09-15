// types

import {loginAPI} from '../api/api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {setIsLoggedInAC} from './AuthReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: statusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{ status: boolean }>) {
            state.isInitialized = action.payload.status
        },
    },
})


export default slice.reducer
export const {setAppStatusAC, setAppErrorAC, setInitializedAC} = slice.actions


// thunks

export const initializeAppTC = (): AppThunk => async (dispatch) => {

    try {
        const res = await loginAPI.initialize()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({status: true}))
        } else {
            dispatch(setIsLoggedInAC({status: false}))
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setInitializedAC({status: true}))

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }

}