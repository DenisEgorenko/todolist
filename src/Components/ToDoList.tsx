import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {filterValuesType} from '../App';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type ToDoListPropsType = {
    title: string,
    error: boolean,
    filter: string,
    tasks: Array<TaskType>,
    removeTask: Function,
    addTask: (value: string) => void,
    changeFilter: (value: filterValuesType) => void,
    changeStatus: (id: string, isDone: boolean) => void,
    setError: (error: boolean) => void
}


function ToDoList(props: ToDoListPropsType) {
    const [inputValue, setInputValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setError(false)
        setInputValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(inputValue)
            setInputValue('')

        }
    };

    const addTask = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim())
            props.setError(false)
            setInputValue('')
        } else {
            setInputValue('')
            props.setError(true)
        }

    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={(e) => onChangeHandler(e)}
                    onKeyPress={(e) => onKeyPressHandler(e)}
                    className={props.error ? 'error' : ''}
                />
                <button onClick={() => {
                    addTask(inputValue)
                }}>+
                </button>

                <div className={props.error ? 'error-message' : 'none-error'}>
                    Field Is Required
                </div>
            </div>

            <ul>
                {
                    props.tasks.map(task => {

                            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked)
                            }

                            const removeClickHandler = () => {
                                props.removeTask(task.id)
                            }

                            return <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={onStatusChangeHandler}/>
                                <span className={!task.isDone ? 'is-done' : ''}>{task.title}</span>
                                <button onClick={removeClickHandler}>X
                                </button>
                            </li>
                        }
                    )
                }
            </ul>

            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList