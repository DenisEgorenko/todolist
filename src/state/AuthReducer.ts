import {loginAPI, loginParamsType, tasksAPI} from '../api/api';
import {AppThunk} from './store';
import {setAppStatusAC} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';

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

export const authReducer = (state: authStateType = initialState, action: authActionType): authStateType => {
    switch (action.type) {
        case 'SET-USER-ID' : {
            return {...state, id: action.id}
        }

        case 'SET-IS-LOGGED-IN' : {
            return {...state, isLoggedIn: action.status}
        }

        default: {
            return state
        }
    }
}


// actions

export const setIsLoggedInAC = (status: boolean) => (
    {
        type: 'SET-IS-LOGGED-IN',
        status
    } as const
)


export const setUserIdAC = (id: number | null) => (
    {
        type: 'SET-USER-ID',
        id
    } as const
)

// thunks

export const loginTC = (data: loginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await loginAPI.login(data)

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserIdAC(res.data.data.userId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await loginAPI.logout()

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setUserIdAC(null))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        console.log(err)
    }
}