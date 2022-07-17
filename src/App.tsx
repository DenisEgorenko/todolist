import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './Components/ToDoList';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addToDoListAC,
    ChangeToDoListFilterActionType,
    ChangeToDoListTitleActionType, removeToDoListAC,
    toDoListsReducer
} from './State/ToDoListsReducer';
import {TasksReducer} from "./State/TasksReducer";


export type filterValuesType = 'all' | 'active' | 'completed'

export type toDoListType = {
    id: string,
    title: string,
    filter: filterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let toDoList1 = v1()
    let toDoList2 = v1()


    let [toDoLists, setToDoLists] = useState<Array<toDoListType>>([
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
            [toDoList1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [toDoList2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: true}
            ]
        }
    )


    function removeTask(listId: string, id: string) {
        tasks[listId] = tasks[listId].filter(t => t.id !== id)

        setTasks({...tasks})
    }

    function addTask(listId: string, value: string) {
        let newTask: TaskType = {id: v1(), title: value, isDone: false};
        tasks[listId].unshift(newTask)
        setTasks({...tasks})
    }

    function changeStatus(listId: string, id: string, isDone: boolean) {
        let task = tasks[listId].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    const changeTitle = (listId: string, taskId: string, title: string) => {
        let changedTask = tasks[listId].find(task => task.id === taskId)
        if (changedTask) {
            changedTask.title = title
            setTasks({...tasks})
        }
    }





    function changeFilter(value: filterValuesType, toDoListId: string) {
        const action: ChangeToDoListFilterActionType = {
            type: 'CHANGE-TODOLIST-FILTER',
            id: toDoListId,
            filter: value
        }
        const listChanged = toDoListsReducer(toDoLists, action)
        setToDoLists(listChanged)
    }

    const removeToDoList = (listId: string) => {
        const endState = toDoListsReducer(toDoLists, removeToDoListAC(listId))
        setToDoLists(endState)

        delete tasks[listId]
        setTasks({...tasks})
    }

    const addToDoList = (value: string) => {
        // const newId = v1()
        // const newToDoList = toDoListsReducer(toDoLists, {type: 'ADD-TODOLIST', title: value, newId: newId})

        const action = addToDoListAC(value)

        const newToDoList = toDoListsReducer(toDoLists, action)
        const newTasks = TasksReducer(tasks, action)

        setToDoLists(newToDoList)
        setTasks(newTasks)

    }

    const changeListTitle = (listId: string, title: string) => {
        const action: ChangeToDoListTitleActionType = {
            type: 'CHANGE-TODOLIST-TITLE',
            id: listId,
            title: title
        }
        let listChanged = toDoListsReducer(toDoLists, action)
        setToDoLists(listChanged)
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

                            let tasksForToDoList = tasks[list.id];

                            if (list.filter === 'completed') {
                                tasksForToDoList = tasks[list.id].filter(t => t.isDone === true)
                            } else if (list.filter === 'active') {
                                tasksForToDoList = tasks[list.id].filter(t => t.isDone === false)
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <ToDoList
                                        id={list.id}
                                        title={list.title}
                                        tasks={tasksForToDoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={list.filter}
                                        removeToDoList={removeToDoList}
                                        changeTitle={changeTitle}
                                        changeListTitle={changeListTitle}/>
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>

            </Container>
        </div>
    );
}


export default App;
