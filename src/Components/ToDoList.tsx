import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../State/store';
import {addTaskAC, addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from '../State/TasksReducer';
import {changeToDoListFilterAC, changeToDoListTitleTC, removeToDoListTC} from '../State/ToDoListsReducer';
import {Task} from './Task';
import {TaskStatus, taskType} from '../api/api';
import {ThunkDispatch} from 'redux-thunk';


type ToDoListPropsType = {
    id: string,
    title: string,
    filter: string,
}


export const ToDoList = React.memo((props: ToDoListPropsType) => {

    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.id])


    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])


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
        dispatch(removeToDoListTC(props.id))
    }

    const addTask = useCallback((value: string) => {
        dispatch(addTaskTC(props.id, value))
    }, [addTaskAC, props.id])


    const changeListTitle = useCallback((title: string) => {
        dispatch(changeToDoListTitleTC(props.id, title))
    }, [props.id])


    let tasksForToDoList = [...tasks];
    if (props.filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatus.completed)
    } else if (props.filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatus.InProgress)
    }


    const onStatusChangeHandler = (taskID: string, value: TaskStatus) => {
        dispatch(updateTaskTC(props.id, taskID, {status: value}))
    }

    const removeClickHandler = (taskID: string) => {
        dispatch(removeTaskTC(props.id, taskID))
    }

    const changeTitleHandler = (taskID: string, title: string) => {
        dispatch(updateTaskTC(props.id, taskID, {title: title}))
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


