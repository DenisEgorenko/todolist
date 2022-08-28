import {applyMiddleware, combineReducers, createStore} from 'redux';
import {toDoListActionType, toDoListsReducer} from './ToDoListsReducer';
import {TasksActionType, TasksReducer} from './TasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appActionType, appReducer} from './AppReducer';


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: TasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppActionsType = toDoListActionType | TasksActionType | appActionType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store