import {tasksAPI, taskType, updateTaskType} from '../api/api';
import {RootState} from './store';
import {addToDoListTC, fetchToDoListTC, removeToDoListTC,} from './ToDoListsReducer';
import {setAppStatusAC} from './AppReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

// types

export type TasksStateType = {
    [key: string]: Array<taskType>
}

export type TasksActionType =
    ReturnType<typeof updateTaskAC>

export type updateTaskTypeForTC = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


// reducer


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ listId: string, taskId: string, model: updateTaskType }>) {
            const tasks = state[action.payload.listId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToDoListTC.fulfilled, (state, action) => {
                state[action.payload.data.id] = [];
            })
            .addCase(removeToDoListTC.fulfilled, (state, action) => {
                delete state[action.payload.listId]
            })
            .addCase(fetchToDoListTC.fulfilled, (state, action) => {
                action.payload.toDoLists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.toDoListID] = action.payload.tasks
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.listId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                tasks.splice(index, 1)
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.data.todoListId].unshift(action.payload.data)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.toDoListID];
                const index = tasks.findIndex(t => t.id === action.payload.taskID)
                tasks[index] = {...tasks[index], ...action.payload.updateModel}
            })
    }
})

export default slice.reducer
export const {updateTaskAC} = slice.actions

// thunks

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (toDoListID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await tasksAPI.getTasks(toDoListID)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {toDoListID, tasks: res.data.items}
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'idle'}))
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { toDoListID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await tasksAPI.deleteTasks(param.toDoListID, param.taskID)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {listId: param.toDoListID, taskId: param.taskID}
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

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { toDoListID: string, value: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await tasksAPI.createTasks(param.toDoListID, param.value)

        if (res.data.resultCode === 0) {
            // thunkAPI.dispatch(addTaskAC({tasks: res.data.data.item}))
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

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
    toDoListID: string,
    taskID: string,
    updateModel: updateTaskTypeForTC
}, thunkAPI) => {

    const state = thunkAPI.getState() as RootState

    const task = state.tasks[param.toDoListID].find(t => t.id === param.taskID)

    if (!task) {
        return thunkAPI.rejectWithValue(null)
    }

    const model: updateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.updateModel
    }

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    try {

        const res = await tasksAPI.updateTasks(param.toDoListID, param.taskID, model)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
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


// export const updateTaskTC = (toDoListID: string, taskID: string, updateModel: updateTaskTypeForTC): AppThunk => (dispatch, getState: () => RootState) => {
//
//     const state = getState()
//     const task = state.tasks[toDoListID].find(t => t.id === taskID)
//
//     if (!task) {
//         return;
//     }
//
//     const model: updateTaskType = {
//         title: task.title,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         startDate: task.startDate,
//         deadline: task.deadline,
//         ...updateModel
//     }
//
//     dispatch(setAppStatusAC({status: 'loading'}))
//
//     tasksAPI.updateTasks(toDoListID, taskID, model)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(updateTaskAC({listId: toDoListID, taskId: taskID, model: model}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }