import {AddToDoListActionType, RemoveToDoListActionType, SetToDoListActionType} from './ToDoListsReducer';
import {tasksAPI, taskType, updateTaskType} from '../api/api';
import {Dispatch} from 'redux';
import {AppRootStateType, AppThunk} from './store';


export type TasksStateType = {
    [key: string]: Array<taskType>
}


export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    listId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    data: taskType
}

export type updateTaskActionType = {
    type: 'UPDATE-TASK',
    listId: string,
    taskId: string,
    model: updateTaskType
}

// export type changeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE',
//     taskId: string,
//     newTitle: string,
//     listId: string,
// }

export type setTasksActionType = {
    type: 'SET-TASKS',
    toDoListId: string,
    tasks: Array<taskType>,
}

export type TasksActionType =
    removeTaskActionType
    | addTaskActionType
    | updateTaskActionType
    | AddToDoListActionType
    | RemoveToDoListActionType
    | SetToDoListActionType
    | setTasksActionType


const initialState: TasksStateType = {
    // [toDoList1]: [
    //     {
    //         id: v1(), title: 'HTML&CSS',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'React',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'JS',
    //         status: TaskStatus.InProgress,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    // ],
    // [toDoList2]: [
    //     {
    //         id: v1(), title: 'React',
    //         status: TaskStatus.InProgress,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'Something',
    //         status: TaskStatus.InProgress,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'Else',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'JS',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'Css',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    //     {
    //         id: v1(), title: 'Vue',
    //         status: TaskStatus.completed,
    //         description: 'string',
    //         priority: TaskPriority.Low,
    //         startDate: 'string',
    //         deadline: 'string',
    //         todoListId: 'string',
    //         order: 0,
    //         addedDate: 'string'
    //     },
    // ]


}

export const TasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state}
            stateCopy[action.listId] = state[action.listId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }

        case 'ADD-TASK' : {
            return {...state, [action.data.todoListId]: [action.data, ...state[action.data.todoListId]]}
        }

        case 'UPDATE-TASK' : {
            const stateCopy = {...state}
            const updatedTasks = state[action.listId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)

            stateCopy[action.listId] = updatedTasks
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state, [action.data.id]: []}
            return stateCopy
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


export const removeTaskAC = (listId: string, taskId: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        listId: listId,
        taskId: taskId
    }
}

export const addTaskAC = (data: taskType): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        data: data
    }
}

export const updateTaskAC = (listId: string, taskId: string, model: updateTaskType): updateTaskActionType => {
    return {
        type: 'UPDATE-TASK',
        listId: listId,
        taskId: taskId,
        model: model
    }
}

export const setTasksAC = (toDoListID: string, tasks: Array<taskType>): setTasksActionType => {
    return {
        type: 'SET-TASKS',
        toDoListId: toDoListID,
        tasks: tasks
    }
}


export const fetchTasksTC = (toDoListID: string): AppThunk => {
    return (dispatch) => {
        tasksAPI.getTasks(toDoListID).then(res => {
            dispatch(setTasksAC(toDoListID, res.data.items))
        })
    }
}


export const addTaskTC = (toDoListID: string, value: string): AppThunk => {
    return (dispatch) => {
        tasksAPI.createTasks(toDoListID, value)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const removeTaskTC = (toDoListID: string, taskID: string): AppThunk => {
    return (dispatch) => {
        tasksAPI.deleteTasks(toDoListID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(toDoListID, taskID))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export type updateTaskTypeForTC = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (toDoListID: string, taskID: string, updateModel: updateTaskTypeForTC): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {

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


        tasksAPI.updateTasks(toDoListID, taskID, model).then(res => {
            dispatch(updateTaskAC(toDoListID, taskID, model))
        })


    }
}