import {v1} from "uuid";
import {AddToDoListActionType, RemoveToDoListActionType, toDoList1, toDoList2} from "./ToDoListsReducer";
import {TaskType} from "../Components/ToDoList";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'


export type removeTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    listId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK',
    value: string,
    listId: string,
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    newStatus: boolean,
    listId: string,
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    newTitle: string,
    listId: string,
}

type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddToDoListActionType
    | RemoveToDoListActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    [toDoList1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false}
    ],
    [toDoList2]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true}
    ]
}

export const TasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK : {
            const stateCopy = {...state}
            stateCopy[action.listId] = state[action.listId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }

        case ADD_TASK : {
            const newTask = {id: v1(), title: action.value, isDone: false}
            const stateCopy = {...state}
            const tasks = stateCopy[action.listId]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.listId] = newTasks
            return stateCopy
        }

        case CHANGE_TASK_STATUS : {
            const stateCopy = {...state}
            const updatedTasks = state[action.listId].map(t => t.id === action.taskId ? {...t, isDone: action.newStatus} : t)
            stateCopy[action.listId] = updatedTasks
            return stateCopy
        }

        case CHANGE_TASK_TITLE : {
            const stateCopy = {...state}
            const updatedTasks = state[action.listId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            stateCopy[action.listId] = updatedTasks
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state, [action.newId]: []}
            return stateCopy
        }

        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default: {
            return state
        }
    }
}


export const removeTaskAC = (taskId: string, listId: string): removeTaskActionType => {
    return {
        type: REMOVE_TASK,
        taskId: taskId,
        listId: listId
    }
}

export const addTaskAC = (value: string, listId: string): addTaskActionType => {
    return {
        type: ADD_TASK,
        value: value,
        listId: listId
    }
}

export const changeTaskStatusAC = (taskId: string, newStatus: boolean, listId: string): changeTaskStatusActionType => {
    return {
        type: CHANGE_TASK_STATUS,
        taskId: taskId,
        newStatus: newStatus,
        listId: listId,
    }
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, listId: string): changeTaskTitleActionType => {
    return {
        type: CHANGE_TASK_TITLE,
        taskId: taskId,
        newTitle: newTitle,
        listId: listId,
    }
}
