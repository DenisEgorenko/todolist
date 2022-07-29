import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from './Components/ToDoList';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addToDoListAC, toDoListType} from './State/ToDoListsReducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";


export type filterValuesType = 'all' | 'active' | 'completed'


export const AppWithRedux = React.memo(() => {

    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootStateType, Array<toDoListType>>(state => state.toDoLists)


    const addToDoList = useCallback(
        (value: string) => {
            dispatch(addToDoListAC(value))
        }, []
    )

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>

                <Grid container spacing={5}>
                    {toDoLists.map(list => {


                            return <Grid item key={list.id}>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
                                        id={list.id}
                                        title={list.title}
                                        filter={list.filter}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>

            </Container>
        </div>
    );
})
