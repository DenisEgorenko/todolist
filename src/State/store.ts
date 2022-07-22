import {combineReducers, createStore} from "redux";
import {toDoListsReducer} from "./ToDoListsReducer";
import {TasksReducer} from "./TasksReducer";


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: TasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store