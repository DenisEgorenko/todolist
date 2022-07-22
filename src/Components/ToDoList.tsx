import React, {ChangeEvent} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../State/TasksReducer";
import {changeToDoListFilterAC, changeToDoListTitleAC, removeToDoListAC} from "../State/ToDoListsReducer";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type ToDoListPropsType = {
    id: string,
    title: string,
    filter: string,

    removeTask: (listId: string, id: string) => void,
    changeStatus: (listId: string, id: string, isDone: boolean) => void,
    changeTitle: (listId: string, taskId: string, title: string) => void
}


function ToDoList(props: ToDoListPropsType) {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])


    const onAllClickHandler = () => {
        dispatch(changeToDoListFilterAC(props.id, 'all'))
    }

    const onActiveClickHandler = () => {
        dispatch(changeToDoListFilterAC(props.id, 'active'))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeToDoListFilterAC(props.id, 'completed'))
    }

    const removeToDoList = () => {
        dispatch(removeToDoListAC(props.id))
    }

    const addTask = (value: string) => {
        dispatch(addTaskAC(value, props.id))
    }

    const changeListTitle = (title: string) => {
        dispatch(changeToDoListTitleAC(props.id, title))
    }


    let tasksForToDoList = [...tasks];
    if (props.filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    } else if (props.filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeListTitle}/>
                <IconButton onClick={removeToDoList}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>



            <div>
                {
                    tasksForToDoList.map(task => {


                            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.id))
                            }

                            const removeClickHandler = () => {
                                dispatch(removeTaskAC(task.id, props.id))
                            }

                            const changeTitle = (title: string) => {
                                dispatch(changeTaskTitleAC(task.id, title, props.id))
                            }

                            return <div key={task.id}>
                                <Checkbox checked={task.isDone}
                                       onChange={onStatusChangeHandler}/>

                                <EditableSpan changeTitle={changeTitle}
                                              title={task.title}/>

                                <IconButton onClick={removeClickHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        }
                    )
                }
            </div>

            <div>
                <Button variant={'outlined'} className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
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
}


export default ToDoList