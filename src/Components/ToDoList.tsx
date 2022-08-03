import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../State/TasksReducer';
import {changeToDoListFilterAC, changeToDoListTitleAC, removeToDoListAC} from "../State/ToDoListsReducer";
import {Task} from "./Task";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type ToDoListPropsType = {
    id: string,
    title: string,
    filter: string,
}


export const ToDoList = React.memo((props: ToDoListPropsType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const onAllClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.id, 'all'))
    }, [props.id])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.id, 'active'))
    }, [props.id])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.id, 'completed'))
    }, [props.id])


    const removeToDoList = () => {
        dispatch(removeToDoListAC(props.id))
    }

    const addTask = useCallback((value: string) => {
        dispatch(addTaskAC(value, props.id))
    }, [addTaskAC, props.id])

    const changeListTitle = useCallback((title: string) => {
        dispatch(changeToDoListTitleAC(props.id, title))
    }, [props.id])

    let tasksForToDoList = [...tasks];
    if (props.filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    } else if (props.filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }

    const onStatusChangeHandler = (taskID: string, value: boolean) => {
        dispatch(changeTaskStatusAC(taskID, value, props.id))
    }

    const removeClickHandler = (taskID: string) => {
        dispatch(removeTaskAC(taskID, props.id))
    }

    const changeTitleHandler = (taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, props.id))
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeListTitle}/>
                <IconButton onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>


            <div>
                {
                    tasksForToDoList.map(task => <Task key={task.id}
                                                       task={task}
                                                       onStatusChangeHandler={onStatusChangeHandler}
                                                       removeClickHandler={removeClickHandler}
                                                       changeTitleHandler={changeTitleHandler}
                    />)
                }
            </div>

            <div>
                <Button variant={'outlined'} className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={'outlined'} className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={'outlined'} className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


