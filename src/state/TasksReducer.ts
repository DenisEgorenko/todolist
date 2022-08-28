import {tasksAPI, taskType, updateTaskType} from '../api/api';
import {AppRootStateType, AppThunk} from './store';
import {addToDoListActionType, removeToDoListActionType, setToDoListActionType} from './ToDoListsReducer';
import {setAppErrorAC, setAppStatusAC} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';

// types

export type TasksStateType = {
    [key: string]: Array<taskType>
}

export type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | addToDoListActionType
    | removeToDoListActionType
    | setToDoListActionType
    | ReturnType<typeof setTasksAC>

export type updateTaskTypeForTC = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


// reducer

const initialState: TasksStateType = {}

export const TasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {...state, [action.listId]: state[action.listId].filter(t => t.id !== action.taskId)}
        }

        case 'ADD-TASK' : {
            return {...state, [action.data.todoListId]: [action.data, ...state[action.data.todoListId]]}
        }

        case 'UPDATE-TASK' : {
            return {
                ...state,
                [action.listId]: state[action.listId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }

        case 'ADD-TODOLIST': {
            return {...state, [action.data.id]: []}
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        case 'SET-TODOLIST': {
            const copyState = {...state}

            action.toDoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'SET-TASKS': {
            return {...state, [action.toDoListId]: action.tasks}
        }

        default: {
            return state
        }
    }
}


// actions

export const removeTaskAC = (listId: string, taskId: string) => (
    {
        type: 'REMOVE-TASK',
        listId: listId,
        taskId: taskId
    } as const
)


export const addTaskAC = (data: taskType) => (
    {
        type: 'ADD-TASK',
        data: data
    } as const
)

export const updateTaskAC = (listId: string, taskId: string, model: updateTaskType) => (
    {
        type: 'UPDATE-TASK',
        listId: listId,
        taskId: taskId,
        model: model
    } as const
)

export const setTasksAC = (toDoListID: string, tasks: Array<taskType>) => (
    {
        type: 'SET-TASKS',
        toDoListId: toDoListID,
        tasks: tasks
    } as const
)


// thunks

export const fetchTasksTC = (toDoListID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(toDoListID)
        .then(res => {
            dispatch(setTasksAC(toDoListID, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTaskTC = (toDoListID: string, value: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTasks(toDoListID, value)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const removeTaskTC = (toDoListID: string, taskID: string): AppThunk => (dispatch) => {
    tasksAPI.deleteTasks(toDoListID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(toDoListID, taskID))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTaskTC = (toDoListID: string, taskID: string, updateModel: updateTaskTypeForTC): AppThunk => (dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const task = state.tasks[toDoListID].find(t => t.id === taskID)

    if (!task) {
        return;
    }

    const model: updateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...updateModel
    }

    dispatch(setAppStatusAC('loading'))

    tasksAPI.updateTasks(toDoListID, taskID, model)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(toDoListID, taskID, model))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}