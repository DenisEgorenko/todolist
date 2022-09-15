import {applyMiddleware, combineReducers, createStore, Dispatch} from 'redux';
import toDoListsReducer, {toDoListActionType} from './ToDoListsReducer';
import TasksReducer, {TasksActionType} from './TasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import appReducer, {appActionType} from './AppReducer';
import authReducer, {authActionType} from './AuthReducer';
import {configureStore} from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: TasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export type AppActionsType = toDoListActionType | TasksActionType | appActionType | authActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store