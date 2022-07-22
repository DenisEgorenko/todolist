// import React, {useReducer, useState} from 'react';
// import './App.css';
// import ToDoList, {TaskType} from './Components/ToDoList';
// import {v1} from 'uuid';
// import AddItemForm from './Components/AddItemForm';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
// import {Menu} from '@mui/icons-material';
// import {
//     addToDoListAC, changeToDoListFilterAC,
//     ChangeToDoListFilterActionType, changeToDoListTitleAC,
//     ChangeToDoListTitleActionType, removeToDoListAC,
//     toDoListsReducer
// } from './State/ToDoListsReducer';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./State/TasksReducer";
//
//
// export type filterValuesType = 'all' | 'active' | 'completed'
//
// export type toDoListType = {
//     id: string,
//     title: string,
//     filter: filterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//
//     let toDoList1 = v1()
//     let toDoList2 = v1()
//
//
//     let [toDoLists, dispatchToDoListsReducer] = useReducer(
//         toDoListsReducer,
//         [
//             {id: toDoList1, title: 'What to learn', filter: 'all'},
//             {id: toDoList2, title: 'What to buy', filter: 'all'}
//         ]
//     )
//
//     let [tasks, dispatchTasksReducer] = useReducer(TasksReducer, {
//             [toDoList1]: [
//                 {id: v1(), title: 'HTML&CSS', isDone: true},
//                 {id: v1(), title: 'JS', isDone: false},
//                 {id: v1(), title: 'ReactJS', isDone: false}
//             ],
//             [toDoList2]: [
//                 {id: v1(), title: 'HTML&CSS', isDone: true},
//                 {id: v1(), title: 'JS', isDone: true},
//                 {id: v1(), title: 'ReactJS', isDone: false},
//                 {id: v1(), title: 'ReactJS', isDone: true},
//                 {id: v1(), title: 'ReactJS', isDone: false},
//                 {id: v1(), title: 'ReactJS', isDone: true}
//             ]
//         }
//     )
//
//
//     function removeTask(listId: string, id: string) {
//         dispatchTasksReducer(removeTaskAC(id, listId))
//     }
//
//     function addTask(listId: string, value: string) {
//         dispatchTasksReducer(addTaskAC(value, listId))
//     }
//
//     function changeStatus(listId: string, id: string, isDone: boolean) {
//         dispatchTasksReducer(changeTaskStatusAC(id, isDone, listId))
//     }
//
//     const changeTitle = (listId: string, taskId: string, title: string) => {
//         dispatchTasksReducer(changeTaskTitleAC(taskId, title, listId))
//     }
//
//     function changeFilter(value: filterValuesType, toDoListId: string) {
//         dispatchToDoListsReducer(changeToDoListFilterAC(toDoListId, value))
//     }
//
//     const removeToDoList = (listId: string) => {
//         const action = removeToDoListAC(listId)
//         dispatchToDoListsReducer(action)
//         dispatchTasksReducer(action)
//     }
//
//     const addToDoList = (value: string) => {
//         const action = addToDoListAC(value)
//         dispatchToDoListsReducer(action)
//         dispatchTasksReducer(action)
//     }
//
//     const changeListTitle = (listId: string, title: string) => {
//         dispatchToDoListsReducer(changeToDoListTitleAC(listId, title))
//     }
//
//
//     return (
//         <div className="App">
//
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color={'inherit'}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container fixed>
//
//                 <Grid container style={{padding: '10px'}}>
//                     <AddItemForm addItem={addToDoList}/>
//                 </Grid>
//
//                 <Grid container spacing={5}>
//                     {toDoLists.map(list => {
//
//                             let tasksForToDoList = tasks[list.id];
//
//                             if (list.filter === 'completed') {
//                                 tasksForToDoList = tasks[list.id].filter(t => t.isDone === true)
//                             } else if (list.filter === 'active') {
//                                 tasksForToDoList = tasks[list.id].filter(t => t.isDone === false)
//                             }
//
//                             return <Grid item>
//                                 <Paper style={{padding: '10px'}}>
//                                     <ToDoList
//                                         id={list.id}
//                                         title={list.title}
//                                         tasks={tasksForToDoList}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeStatus={changeStatus}
//                                         filter={list.filter}
//                                         removeToDoList={removeToDoList}
//                                         changeTitle={changeTitle}
//                                         changeListTitle={changeListTitle}/>
//                                 </Paper>
//                             </Grid>
//                         }
//                     )}
//                 </Grid>
//
//             </Container>
//         </div>
//     );
// }
//
//
export default null;
