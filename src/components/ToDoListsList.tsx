import {AppRootStateType, useAppDispatch} from '../state/store';
import {useSelector} from 'react-redux';
import {addToDoListTC, fetchToDoListTC, toDoListDomainType} from '../state/ToDoListsReducer';
import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from './AddItemForm';
import {ToDoList} from './ToDoList';

type toDoListListPropsType = {
    demo?: boolean
}

export const ToDoListsList = ({demo = false}: toDoListListPropsType) => {
    const dispatch = useAppDispatch()
    const toDoLists = useSelector<AppRootStateType, Array<toDoListDomainType>>(state => state.toDoLists)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchToDoListTC())
    }, [])

    const addToDoList = useCallback(
        (value: string) => {
            dispatch(addToDoListTC(value))
        }, []
    )

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