import {setAppErrorAC, setAppStatusAC} from '../state/AppReducer';
import {responseType} from '../api/api';
import {AppDispatch} from '../state/store';

export const handleServerAppError = (data: responseType, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some Error'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some Error'))
    dispatch(setAppStatusAC('failed'))
}