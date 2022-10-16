import {useAppDispatch, useAppSelector} from '../state/store';
import {addToDoListTC, fetchToDoListTC, toDoListDomainType} from '../state/ToDoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from './AddItemForm';
import {ToDoList} from './ToDoList';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from "../state/selectors";

type toDoListListPropsType = {
    demo?: boolean
}

export const ToDoListsList = ({demo = false}: toDoListListPropsType) => {
    const dispatch = useAppDispatch()
    const toDoLists = useAppSelector<Array<toDoListDomainType>>(state => state.toDoLists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (demo|| !isLoggedIn) {
            return
        }
        dispatch(fetchToDoListTC({}))
    }, [])

    const addToDoList = useCallback(
        (value: string) => {
            dispatch(addToDoListTC(value))
        }, []
    )

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItem={addToDoList}/>
            </Grid>

            <Grid container spacing={4}>
                {toDoLists.map(list => {
                        return <Grid item key={list.id}>
                            <Paper style={{padding: '10px'}}>
                                <ToDoList
                                    toDoList={list}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </>
    )
}