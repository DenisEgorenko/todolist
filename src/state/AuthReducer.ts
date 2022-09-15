import {loginAPI, loginParamsType, tasksAPI} from '../api/api';
import {AppThunk} from './store';
import {setAppStatusAC} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// types
export type authStateType = {
    id: number | null,
    email: string,
    login: string,
    isLoggedIn: boolean
}


export type authActionType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserIdAC>

// reducer

const initialState: authStateType = {
    id: null,
    email: '',
    login: '',
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ status: boolean }>) {
            state.isLoggedIn = action.payload.status
        },
        setUserIdAC(state, action: PayloadAction<{ id: number | null }>) {
            state.id = action.payload.id
        },
    },
})


export default slice.reducer
export const {setIsLoggedInAC, setUserIdAC} = slice.actions


// thunks

export const loginTC = (data: loginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await loginAPI.login(data)

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({status: true}))
            dispatch(setUserIdAC({id: res.data.data.userId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await loginAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({status: false}))
            dispatch(setUserIdAC({id: null}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }
}