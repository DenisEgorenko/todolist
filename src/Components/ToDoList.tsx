import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {filterValuesType} from '../App';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type ToDoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: Function,
    addTask: (value: string) => void,
    changeFilter: (value: filterValuesType) => void
}


function ToDoList(props: ToDoListPropsType) {
    const [inputValue, setInputValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(inputValue)
            setInputValue('')

        }
    };

    const addTask = (inputValue:string) => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={(e) => onChangeHandler(e)}
                    onKeyPress={(e) => onKeyPressHandler(e)}
                />
                <button onClick={() => {addTask(inputValue)}}>+</button>
            </div>

            <ul>
                {
                    props.tasks.map(task =>
                        <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {props.removeTask(task.id)}}>X</button>
                        </li>
                    )
                }
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList