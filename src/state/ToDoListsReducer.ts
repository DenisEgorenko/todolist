import {toDoListsAPI, toDoListType} from '../api/api';
import {AppThunk} from './store';
import {setAppStatusAC, statusType} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

// types

export type filterValuesType = 'all' | 'active' | 'completed'

export type toDoListDomainType = toDoListType & {
    filter: filterValuesType,
    entityStatus: statusType
}


export type toDoListActionType =
    | ReturnType<typeof changeToDoListFilterAC>
    | ReturnType<typeof changeEntityStatusAC>


// reducer

const slice = createSlice({
    name: 'toDoList',
    initialState: [] as Array<toDoListDomainType>,
    reducers: {
        changeToDoListFilterAC(state, action: PayloadAction<{ listId: string, filter: filterValuesType }>) {
            const index = state.findIndex(list => list.id === action.payload.listId)
            state[index].filter = action.payload.filter
        },
        changeEntityStatusAC(state, action: PayloadAction<{ listId: string, status: statusType }>) {
            const index = state.findIndex(list => list.id === action.payload.listId)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDoListTC.fulfilled, (state, action) => {
                return action.payload.toDoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeToDoListTC.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.listId)
                state.splice(index, 1)
            })
            .addCase(addToDoListTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.data, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeToDoListTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(list => list.id === action.payload.listId)
                state[index].title = action.payload.title
            })
    }
})


export default slice.reducer
export const {
    changeToDoListFilterAC,
    changeEntityStatusAC
} = slice.actions


// thunks

export const fetchToDoListTC = createAsyncThunk('toDoList/fetchToDoList', async (params: {}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await toDoListsAPI.getToDoLists()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {toDoLists: res.data}
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {

    }
})


export const removeToDoListTC = createAsyncThunk('toDoList/removeToDoList', async (toDoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeEntityStatusAC({listId: toDoListID, status: 'loading'}))

    try {
        const res = await toDoListsAPI.deleteToDoLists(toDoListID)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {listId: toDoListID}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {

    }
})


export const addToDoListTC = createAsyncThunk('toDoList/addToDoList', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await toDoListsAPI.createToDoList(title)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {data: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {

    }
})

export const changeToDoListTitleTC = createAsyncThunk('toDoList/changeToDoListTitle', async (params: {
    listId: string,
    title: string
}, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await toDoListsAPI.updateToDoLists(params.listId, params.title)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return params
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {

    }
})
