import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from './Components/ToDoList';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addToDoListAC,
    addToDoListTC,
    fetchToDoListTC,
    setToDoListAC,
    toDoListDomainType
} from './State/ToDoListsReducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from './State/store';
import {toDoListsAPI} from './api/api';
import {ThunkDispatch} from 'redux-thunk';




export const App = React.memo(() => {

    const dispatch = useAppDispatch()
    const toDoLists = useSelector<AppRootStateType, Array<toDoListDomainType>>(state => state.toDoLists)


    const addToDoList = useCallback(
        (value: string) => {
            dispatch(addToDoListTC(value))
        }, []
    )

    useEffect(()=>{
        dispatch(fetchToDoListTC())
    }, [])

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
