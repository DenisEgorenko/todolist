import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskType} from './ToDoList';

type taskPropsType = {
    task: TaskType
    onStatusChangeHandler: (taskID: string, value: boolean) => void
    removeClickHandler: (taskID: string) => void
    changeTitleHandler: (taskID: string, title: string) => void
}
export const Task = React.memo((props: taskPropsType) => {

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onStatusChangeHandler(props.task.id, e.currentTarget.checked)
    }

    const removeClickHandler = () => {
        props.removeClickHandler(props.task.id)
    }

    const changeTitle = (title: string) => {
        props.changeTitleHandler(props.task.id, title)
    }

    return <div key={props.task.id}>
        <Checkbox checked={props.task.isDone}
                  onChange={onStatusChangeHandler}/>

        <EditableSpan changeTitle={changeTitle}
                      title={props.task.title}/>

        <IconButton onClick={removeClickHandler}>
            <Delete/>
        </IconButton>
    </div>

})