import {setAppErrorAC, setAppStatusAC} from '../state/AppReducer';
import {responseType} from '../api/api';
import {AppDispatch} from '../state/store';

export const handleServerAppError = (data: responseType, dispatch: any) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some Error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: any) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some Error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}