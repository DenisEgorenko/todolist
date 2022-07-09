import {filterValuesType, toDoListType} from '../App';
import {v1} from 'uuid';

export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddToDoListActionType = {
    type: 'ADD-TODOLIST',
    newId: string,
    title: string
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

type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType


export const toDoListsReducer = (state: Array<toDoListType>, action: ActionType): Array<toDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(item => item.id !== action.id)
        }

        case 'ADD-TODOLIST' : {
            const newToDo: toDoListType = {id: action.newId, title: action.title, filter: 'all'}
            return [newToDo, ...state]
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

        default: {
            throw new Error('There is no such action type')
        }
    }
}


export const RemoveToDoListAC = (listId: string): RemoveToDoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: listId
    }
}

export const AddToDoListAC = (title: string, newId: string): AddToDoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        newId: newId
    }
}

export const ChangeToDoListTitleAC = (listId: string, title: string): ChangeToDoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: listId,
        title: title
    }
}

export const ChangeToDoListFilterAC = (listId: string, filter: filterValuesType): ChangeToDoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: listId,
        filter: filter
    }
}