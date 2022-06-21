import React, {ChangeEvent} from 'react';
import {filterValuesType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type ToDoListPropsType = {
    id: string,
    title: string,
    filter: string,
    tasks: Array<TaskType>,
    removeTask: (listId: string, id: string) => void,
    addTask: (listId: string, value: string) => void,
    changeFilter: (value: filterValuesType, toDoListId: string) => void,
    changeStatus: (listId: string, id: string, isDone: boolean) => void,
    removeToDoList: (listId: string) => void,
    changeTitle: (listId: string, taskId: string, title: string) => void
    changeListTitle: (listId: string, title: string) => void
}


function ToDoList(props: ToDoListPropsType) {


    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const removeToDoList = () => {
        props.removeToDoList(props.id)
    }

    const addTask = (value: string) => {
        props.addTask(props.id, value)
    }

    const changeListTitle = (title: string) => {
        props.changeListTitle(props.id, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeListTitle}/>
                <button onClick={removeToDoList}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map(task => {

                            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(props.id, task.id, e.currentTarget.checked)
                            }

                            const removeClickHandler = () => {
                                props.removeTask(props.id, task.id)
                            }

                            const changeTitle = (title: string) => {
                                props.changeTitle(props.id, task.id, title)
                            }

                            return <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={onStatusChangeHandler}/>

                                <EditableSpan changeTitle={changeTitle}
                                              title={task.title}/>

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