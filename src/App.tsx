import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './Components/ToDoList';
import {v1} from 'uuid';
import AddItemForm from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    ChangeToDoListFilterActionType,
    ChangeToDoListTitleActionType,
    toDoListsReducer
} from './State/ToDoListsReducer';


export type filterValuesType = 'all' | 'active' | 'completed'

export type toDoListType = {
    id: string,
    title: string,
    filter: filterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let toDoList1 = v1()
    let toDoList2 = v1()


    let [toDoLists, setToDoLists] = useState<Array<toDoListType>>([
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ])

    let [allTasks, setAllTasks] = useState<TasksStateType>({
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
        allTasks[listId] = allTasks[listId].filter(t => t.id !== id)

        setAllTasks({...allTasks})
    }

    function addTask(listId: string, value: string) {
        let newTask: TaskType = {id: v1(), title: value, isDone: false};
        allTasks[listId].unshift(newTask)
        setAllTasks({...allTasks})
    }

    function changeStatus(listId: string, id: string, isDone: boolean) {

        let task = allTasks[listId].find(t => t.id === id)

        if (task) {
            task.isDone = isDone
        }

        setAllTasks({...allTasks})

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
        const endState = toDoListsReducer(toDoLists, {type: 'REMOVE-TODOLIST', id: listId})
        setToDoLists(endState)

        delete allTasks[listId]
        setAllTasks({...allTasks})
    }


    const addToDoList = (value: string) => {
        const newId = v1()
        const newToDoList = toDoListsReducer(toDoLists, {type: 'ADD-TODOLIST', title: value, newId: newId})

        setToDoLists(newToDoList)
        setAllTasks({...allTasks, [newId]: []})
    }

    const changeTitle = (listId: string, taskId: string, title: string) => {
        let changedTask = allTasks[listId].find(task => task.id === taskId)
        if (changedTask) {
            changedTask.title = title
            setAllTasks({...allTasks})
        }

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

                            let tasksForToDoList = allTasks[list.id];

                            if (list.filter === 'completed') {
                                tasksForToDoList = allTasks[list.id].filter(t => t.isDone === true)
                            } else if (list.filter === 'active') {
                                tasksForToDoList = allTasks[list.id].filter(t => t.isDone === false)
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
