import axios from 'axios';
import {DeleteToDoLists, UpdateToDoLists} from '../stories/todolists-api.stories';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'aa19c4a6-4fef-4563-97b0-4ec3a65b0ffa'}
});

export type toDoListType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

export type createToDoListResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: {
            'id': string
            'title': string
            'addedDate': string
            'order': number
        }
    }
}

export type responseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export const toDoListsAPI = {

    getToDoLists() {
        return instance.get<Array<toDoListType>>('todo-lists')
    },

    createToDoList(title: string) {
        return instance.post<responseType<{ item: toDoListType }>>('todo-lists', {title: title})
    },

    deleteToDoLists(todolistId: string) {
        return instance.delete<responseType>(`todo-lists/${todolistId}`)
    },

    updateToDoLists(todolistId: string, title: string) {
        return instance.put<responseType>(`todo-lists/${todolistId}`, {title: title})
    },
}

export type taskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type tasksResponseType = {
    items: taskType[]
    totalCount: number,
    error: string
}


export type updateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<tasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },


    createTasks(todolistId: string, title: string) {
        return instance.post<responseType<{ item: taskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },

    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<responseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },


    updateTasks(todolistId: string, taskId: string) {
        return instance.put<responseType<{ item: taskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: 'updatedTask'})
    },
}