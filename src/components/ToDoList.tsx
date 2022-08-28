import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../state/store';
import {addTaskAC, addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from '../state/TasksReducer';
import {
    changeToDoListFilterAC,
    changeToDoListTitleTC,
    removeToDoListTC,
    toDoListDomainType
} from '../state/ToDoListsReducer';
import {Task} from './Task';
import {TaskStatus, taskType} from '../api/api';


type ToDoListPropsType = {
    toDoList: toDoListDomainType
    demo?: boolean
}

export const ToDoList = React.memo(({demo = false, ...props}: ToDoListPropsType) => {

    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, Array<taskType>>(state => state.tasks[props.toDoList.id])


    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.toDoList.id))
    }, [])


    const onAllClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.toDoList.id, 'all'))
    }, [props.toDoList.id])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.toDoList.id, 'active'))
    }, [props.toDoList.id])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeToDoListFilterAC(props.toDoList.id, 'completed'))
    }, [props.toDoList.id])


    const removeToDoList = () => {
        dispatch(removeToDoListTC(props.toDoList.id))
    }

    const addTask = useCallback((value: string) => {
        dispatch(addTaskTC(props.toDoList.id, value))
    }, [addTaskAC, props.toDoList.id])


    const changeListTitle = useCallback((title: string) => {
        dispatch(changeToDoListTitleTC(props.toDoList.id, title))
    }, [props.toDoList.id])


    let tasksForToDoList = [...tasks];
    if (props.toDoList.filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatus.completed)
    } else if (props.toDoList.filter === 'active') {
        tasksForToDoList = tasks.filter(t => (t.status === TaskStatus.InProgress || t.status === TaskStatus.new))
    }


    const onStatusChangeHandler = (taskID: string, value: TaskStatus) => {
        debugger
        dispatch(updateTaskTC(props.toDoList.id, taskID, {status: value}))
    }

    const removeClickHandler = (taskID: string) => {
        dispatch(removeTaskTC(props.toDoList.id, taskID))
    }

    const changeTitleHandler = (taskID: string, title: string) => {
        dispatch(updateTaskTC(props.toDoList.id, taskID, {title: title}))
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.toDoList.title} changeTitle={changeListTitle}/>
                <IconButton onClick={removeToDoList} disabled={props.toDoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm disabled={props.toDoList.entityStatus === 'loading'} addItem={addTask}/>


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
                <Button variant={'outlined'} className={props.toDoList.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={'outlined'} className={props.toDoList.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={'outlined'} className={props.toDoList.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


