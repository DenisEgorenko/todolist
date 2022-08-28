import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, RootState} from '../state/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {toDoListsReducer} from '../state/ToDoListsReducer';
import {TasksReducer} from '../state/TasksReducer';
import {TaskPriority, TaskStatus} from '../api/api';
import {appReducer, statusType} from '../state/AppReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: TasksReducer,
    app: appReducer
})

const initialGlobalState: RootState = {
    toDoLists: [
        {id: 'toDoList1', title: 'What to learn', order: 1, addedDate: '', filter: 'all', entityStatus: 'idle'},
        {id: 'toDoList2', title: 'What to buy', order: 1, addedDate: '', filter: 'all', entityStatus: 'loading'}
    ],
    tasks: {
        ['toDoList1']: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '3',
                title: 'ReactJS',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        ['toDoList2']: [
            {
                id: '1',
                title: 'Что-то 1',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '2',
                title: 'JS 2',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '3',
                title: 'ReactJS 2',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    },

    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (story: () => ReactNode) => (
    <Provider store={storyBookStore}>
        {story()}
    </Provider>
)