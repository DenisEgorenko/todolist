import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../State/store';
import {combineReducers, createStore} from 'redux';
import {toDoListsReducer} from '../State/ToDoListsReducer';
import {TasksReducer} from '../State/TasksReducer';
import {v1} from 'uuid';


const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: TasksReducer
})

const initialGlobalState = {
    toDoLists: [
        {id: 'toDoList1', title: 'What to learn1', filter: 'all'},
        {id: 'toDoList2', title: 'What to buy2', filter: 'all'}
    ],
    tasks: {
        ['toDoList1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        ['toDoList2']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (story: () => ReactNode) => (
    <Provider store={storyBookStore}>
        {story()}
    </Provider>
)