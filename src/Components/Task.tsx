import {useDispatch} from "react-redux";
import React, {ChangeEvent} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../State/TasksReducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./ToDoList";

type taskPropsType = {
    id: string
    task: TaskType
}
export const Task = React.memo((props: taskPropsType) => {

    const dispatch = useDispatch()

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.id))
    }

    const removeClickHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.id))
    }

    const changeTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.id))
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