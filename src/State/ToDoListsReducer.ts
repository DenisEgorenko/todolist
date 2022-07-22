import {v1, v4} from 'uuid';
import {filterValuesType} from "../AppWithRedux";

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

export type toDoListType = {
    id: string,
    title: string,
    filter: filterValuesType
}

export let toDoList1 = v1()
export let toDoList2 = v1()

const initialState: Array<toDoListType> = [
    {id: toDoList1, title: 'What to learn', filter: 'all'},
    {id: toDoList2, title: 'What to buy', filter: 'all'}
]

export const toDoListsReducer = (state: Array<toDoListType> = initialState, action: ActionType): Array<toDoListType> => {
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

export const addToDoListAC = (title: string): AddToDoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        newId: v1()
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