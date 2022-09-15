import {tasksAPI, taskType, toDoListType, updateTaskType} from '../api/api';
import {AppThunk, RootState} from './store';
import toDoListsReducer, {
    addToDoListAC,
    addToDoListActionType,
    filterValuesType, removeToDoListAC,
    removeToDoListActionType, setToDoListAC,
    setToDoListActionType
} from './ToDoListsReducer';
import {setAppStatusAC, statusType} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ listId: string, taskId: string }>) {
            const tasks = state[action.payload.listId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ data: taskType }>) {
            state[action.payload.data.todoListId].unshift(action.payload.data)
        },
        updateTaskAC(state, action: PayloadAction<{ listId: string, taskId: string, model: updateTaskType }>) {
            const tasks = state[action.payload.listId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
        setTasksAC(state, action: PayloadAction<{ toDoListID: string, tasks: Array<taskType> }>) {
            state[action.payload.toDoListID] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToDoListAC, (state, action) => {
                state[action.payload.data.id] = [];
            })
            .addCase(removeToDoListAC, (state, action) => {
                delete state[action.payload.listId]
            })
            .addCase(setToDoListAC, (state, action) => {
                action.payload.toDoLists.forEach(tl => {
                    state[tl.id] = []
                })
            })
    }
})

export default slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

// thunks

export const fetchTasksTC = (toDoListID: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(toDoListID)
        .then(res => {
            dispatch(setTasksAC({toDoListID: toDoListID, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTaskTC = (toDoListID: string, value: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTasks(toDoListID, value)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({data: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
                dispatch(removeTaskAC({listId: toDoListID, taskId: taskID}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTaskTC = (toDoListID: string, taskID: string, updateModel: updateTaskTypeForTC): AppThunk => (dispatch, getState: () => RootState) => {

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

    dispatch(setAppStatusAC({status: 'loading'}))

    tasksAPI.updateTasks(toDoListID, taskID, model)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({listId: toDoListID, taskId: taskID, model: model}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}