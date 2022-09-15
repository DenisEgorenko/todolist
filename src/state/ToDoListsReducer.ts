import {toDoListsAPI, toDoListType} from '../api/api';
import {AppThunk} from './store';
import {setAppStatusAC, statusType} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// types

export type filterValuesType = 'all' | 'active' | 'completed'

export type toDoListDomainType = toDoListType & {
    filter: filterValuesType,
    entityStatus: statusType
}

export type addToDoListActionType = ReturnType<typeof addToDoListAC>
export type removeToDoListActionType = ReturnType<typeof removeToDoListAC>
export type setToDoListActionType = ReturnType<typeof setToDoListAC>

export type toDoListActionType =
    removeToDoListActionType
    | addToDoListActionType
    | ReturnType<typeof changeToDoListTitleAC>
    | ReturnType<typeof changeToDoListFilterAC>
    | ReturnType<typeof changeEntityStatusAC>
    | setToDoListActionType


// reducer

const initialState: Array<toDoListDomainType> = []


const slice = createSlice({
    name: 'toDoList',
    initialState: initialState,
    reducers: {
        removeToDoListAC(state, action: PayloadAction<{ listId: string }>) {
            const index = state.findIndex(item => item.id === action.payload.listId)
            state.splice(index, 1)
        },
        addToDoListAC(state, action: PayloadAction<{ data: toDoListType }>) {
            state.unshift({...action.payload.data, filter: 'all', entityStatus: 'idle'})
        },
        changeToDoListTitleAC(state, action: PayloadAction<{ listId: string, title: string }>) {
            const index = state.findIndex(list => list.id === action.payload.listId)
            state[index].title = action.payload.title
        },
        changeToDoListFilterAC(state, action: PayloadAction<{ listId: string, filter: filterValuesType }>) {
            const index = state.findIndex(list => list.id === action.payload.listId)
            state[index].filter = action.payload.filter
        },
        setToDoListAC(state, action: PayloadAction<{ toDoLists: Array<toDoListType> }>) {
            return action.payload.toDoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeEntityStatusAC(state, action: PayloadAction<{ listId: string, status: statusType }>) {
            const index = state.findIndex(list => list.id === action.payload.listId)
            state[index].entityStatus = action.payload.status
        },
    },
})


export default slice.reducer
export const {
    removeToDoListAC,
    addToDoListAC,
    changeToDoListTitleAC,
    changeToDoListFilterAC,
    setToDoListAC,
    changeEntityStatusAC
} = slice.actions


// export const toDoListsReducer = (state: Array<toDoListDomainType> = initialState, action: toDoListActionType): Array<toDoListDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST' : {
//             return state.filter(item => item.id !== action.id)
//         }
//
//         case 'ADD-TODOLIST' : {
//             return [{...action.data, filter: 'all', entityStatus: 'idle'}, ...state]
//         }
//
//         case 'CHANGE-TODOLIST-TITLE' : {
//             return state.map(list => list.id === action.id ? {...list, title: action.title} : list)
//         }
//
//         case 'CHANGE-TODOLIST-FILTER' : {
//             return state.map(list => list.id === action.id ? {...list, filter: action.filter} : list)
//         }
//
//         case 'SET-TODOLIST': {
//             return action.toDoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
//         }
//
//         case 'CHANGE-ENTITY-STATUS': {
//             return state.map(list => list.id === action.id ? {...list, entityStatus: action.status} : list)
//         }
//
//         default: {
//             return state
//         }
//     }
// }


// thunks

export const fetchToDoListTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    toDoListsAPI.getToDoLists().then(res => {
        dispatch(setToDoListAC({toDoLists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    })
}

export const removeToDoListTC = (toDoListID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeEntityStatusAC({listId: toDoListID, status: 'loading'}))

    toDoListsAPI.deleteToDoLists(toDoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeToDoListAC({listId: toDoListID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addToDoListTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    toDoListsAPI.createToDoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addToDoListAC({data: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeToDoListTitleTC = (listId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    toDoListsAPI.updateToDoLists(listId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeToDoListTitleAC({listId: listId, title: title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
