import {toDoListsAPI, toDoListType} from '../api/api';
import {AppThunk} from './store';
import {setAppStatusAC, statusType} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';

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

export const toDoListsReducer = (state: Array<toDoListDomainType> = initialState, action: toDoListActionType): Array<toDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(item => item.id !== action.id)
        }

        case 'ADD-TODOLIST' : {
            return [{...action.data, filter: 'all', entityStatus: 'idle'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(list => list.id === action.id ? {...list, title: action.title} : list)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(list => list.id === action.id ? {...list, filter: action.filter} : list)
        }

        case 'SET-TODOLIST': {
            return action.toDoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }

        case 'CHANGE-ENTITY-STATUS': {
            return state.map(list => list.id === action.id ? {...list, entityStatus: action.status} : list)
        }

        default: {
            return state
        }
    }
}


// actions

export const removeToDoListAC = (listId: string) => ({
    type: 'REMOVE-TODOLIST', id: listId
} as const)

export const addToDoListAC = (data: toDoListType) => ({
    type: 'ADD-TODOLIST',
    data: data
} as const)

export const changeToDoListTitleAC = (listId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: listId,
    title: title
} as const)

export const changeToDoListFilterAC = (listId: string, filter: filterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: listId,
    filter: filter
} as const)

export const setToDoListAC = (toDoLists: Array<toDoListType>) => ({
    type: 'SET-TODOLIST',
    toDoLists: toDoLists,
} as const)

export const changeEntityStatusAC = (listId: string, status: statusType) => ({
    type: 'CHANGE-ENTITY-STATUS',
    status: status,
    id: listId
} as const)


// thunks

export const fetchToDoListTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    toDoListsAPI.getToDoLists().then(res => {
        dispatch(setToDoListAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeToDoListTC = (toDoListID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityStatusAC(toDoListID, 'loading'))

    toDoListsAPI.deleteToDoLists(toDoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeToDoListAC(toDoListID))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addToDoListTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    toDoListsAPI.createToDoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addToDoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeToDoListTitleTC = (listId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    toDoListsAPI.updateToDoLists(listId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeToDoListTitleAC(listId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
