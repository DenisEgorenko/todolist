import {v1, v4} from 'uuid';
import {toDoListsAPI, toDoListType} from '../api/api';
import {Dispatch} from 'redux';
import {AppThunk} from './store';


export type filterValuesType = 'all' | 'active' | 'completed'

export type toDoListDomainType = toDoListType & {
    filter: filterValuesType
}


export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddToDoListActionType = {
    type: 'ADD-TODOLIST',
    data: toDoListType,
}

export type ChangeToDoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeToDoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: filterValuesType
}


export type SetToDoListActionType = {
    type: 'SET-TODOLIST',
    toDoLists: Array<toDoListType>,
}

export type toDoListActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType
    | SetToDoListActionType


// export let toDoList1 = v1()
// export let toDoList2 = v1()


const initialState: Array<toDoListDomainType> = [
    // {id: toDoList1, title: 'What to learn', order: 1, addedDate: '', filter: 'all'},
    // {id: toDoList2, title: 'What to buy', order: 1, addedDate: '', filter: 'all'}


]

export const toDoListsReducer = (state: Array<toDoListDomainType> = initialState, action: toDoListActionType): Array<toDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(item => item.id !== action.id)
        }

        case 'ADD-TODOLIST' : {
            return [{...action.data, filter: 'all'}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            let stateCopy = [...state]
            let list = stateCopy.find(list => list.id === action.id)
            if (list) {
                list.title = action.title
            }
            return stateCopy
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            let stateCopy = [...state]
            let list = stateCopy.find(list => list.id === action.id)
            if (list) {
                list.filter = action.filter
            }
            return stateCopy
        }

        case 'SET-TODOLIST': {
            return action.toDoLists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }

        default: {
            return state
        }
    }
}


export const removeToDoListAC = (listId: string): RemoveToDoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: listId
    }
}

export const addToDoListAC = (data: toDoListType): AddToDoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        data: data,
    }
}

export const changeToDoListTitleAC = (listId: string, title: string): ChangeToDoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: listId,
        title: title
    }
}

export const changeToDoListFilterAC = (listId: string, filter: filterValuesType): ChangeToDoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: listId,
        filter: filter
    }
}

export const setToDoListAC = (toDoLists: Array<toDoListType>): SetToDoListActionType => {
    return {
        type: 'SET-TODOLIST',
        toDoLists: toDoLists,
    }
}


export const fetchToDoListTC = (): AppThunk => (dispatch) => {
    toDoListsAPI.getToDoLists().then(res => {
        dispatch(setToDoListAC(res.data))
    })
}


export const removeToDoListTC = (toDoListID: string): AppThunk => {
    return (dispatch) => {
        toDoListsAPI.deleteToDoLists(toDoListID).then(res => {
            dispatch(removeToDoListAC(toDoListID))
        })
    }
}


export const addToDoListTC = (title: string): AppThunk => {
    return (dispatch) => {
        toDoListsAPI.createToDoList(title).then(res => {
            dispatch(addToDoListAC(res.data.data.item))
        })
    }
}


export const changeToDoListTitleTC = (listId: string, title: string): AppThunk => {
    return (dispatch) => {
        toDoListsAPI.updateToDoLists(listId, title).then(res => {
            dispatch(changeToDoListTitleAC(listId, title))
        })
    }
}