import React from 'react';
import './App.css';
import ToDoList from './Components/ToDoList';
import AddItemForm from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    toDoListType
} from './State/ToDoListsReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./State/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";


export type filterValuesType = 'all' | 'active' | 'completed'


function AppWithRedux() {

    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootStateType, Array<toDoListType>>(state => state.toDoLists)

    function removeTask(listId: string, id: string) {
        dispatch(removeTaskAC(id, listId))
    }

    function addTask(listId: string, value: string) {
        dispatch(addTaskAC(value, listId))
    }

    function changeStatus(listId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(id, isDone, listId))
    }

    const changeTitle = (listId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, listId))
    }

    const removeToDoList = (listId: string) => {
        dispatch(removeToDoListAC(listId))
    }

    const addToDoList = (value: string) => {
        dispatch(addToDoListAC(value))
    }

    const changeListTitle = (listId: string, title: string) => {
        dispatch(changeToDoListTitleAC(listId, title))
    }


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


                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
                                        id={list.id}
                                        title={list.title}
                                        removeTask={removeTask}
                                        changeStatus={changeStatus}
                                        filter={list.filter}
                                        changeTitle={changeTitle}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>

            </Container>
        </div>
    );
}


export default AppWithRedux;
