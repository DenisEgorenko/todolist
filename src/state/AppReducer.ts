// types

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type errorType = string | null


export type appStateType = {
    status: statusType
    error: errorType
}

export type appActionType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


// reducer

const initialState: appStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: appStateType = initialState, action: appActionType): appStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR' : {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}


// actions

export const setAppStatusAC = (status: statusType) => ({
    type: 'APP/SET-STATUS', status: status
} as const)

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR', error: error
} as const)

// thunks

// export const fetchToDoListTC = (): AppThunk => (dispatch) => {
//     toDoListsAPI.getToDoLists().then(res => {
//         dispatch(setToDoListAC(res.data))
//     })
// }