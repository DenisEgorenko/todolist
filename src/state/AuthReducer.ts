import {fieldErrorType, loginAPI, loginParamsType} from '../api/api';
import {setAppStatusAC} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

// types
export type authStateType = {
    id: number | null,
    email: string,
    login: string,
    isLoggedIn: boolean
}


export type authActionType =
    ReturnType<typeof setIsLoggedInAC>
// reducer

const slice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: '',
        login: '',
        isLoggedIn: false
    } as authStateType,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ status: boolean }>) {
            state.isLoggedIn = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})


export default slice.reducer
export const {setIsLoggedInAC} = slice.actions


// thunks

export const loginTC = createAsyncThunk<any,
    loginParamsType,
    { rejectValue: { errors: string[], fieldErrors?: fieldErrorType } }>('auth/login', async (data, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await loginAPI.login(data)


        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldErrors})
        }

    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [err.message], fieldErrors: undefined})
    } finally {

    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (data: {}, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await loginAPI.logout()

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return Promise.reject()
        }

    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return Promise.reject()
    } finally {

    }
})
