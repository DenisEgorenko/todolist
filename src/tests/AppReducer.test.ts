import {removeTaskAC, TasksReducer} from '../state/TasksReducer';
import {appReducer, appStateType, setAppErrorAC, setAppStatusAC} from '../state/AppReducer';


test('correct Error should be set', () => {

    const startState: appStateType = {
        status: 'idle',
        error: null,
        isInitialized: false
    }

    const endState = appReducer(startState, setAppErrorAC('Error'))

    expect(endState.error).toBe('Error')

})


test('correct status should be set', () => {

    const startState: appStateType = {
        status: 'idle',
        error: null,
        isInitialized: false
    }

    const endState = appReducer(startState, setAppStatusAC('succeeded'))

    expect(endState.status).toBe('succeeded')

})