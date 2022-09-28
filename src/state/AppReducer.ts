import {loginAPI} from '../api/api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from './AuthReducer';
import {AxiosError} from 'axios';

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


// reducer

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as appStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: statusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        // setInitializedAC(state, action: PayloadAction<{ status: boolean }>) {
        //     state.isInitialized = action.payload.status
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
    }


})


export default slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions


// thunks

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (data: {}, thunkAPI) => {
    try {
        const res = await loginAPI.initialize()

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({status: true}))
        } else {
            thunkAPI.dispatch(setIsLoggedInAC({status: false}))
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
        // thunkAPI.dispatch(setInitializedAC({status: true}))

    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return Promise.reject()
    }
})
