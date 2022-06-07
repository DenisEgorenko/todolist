import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './Components/ToDoList';
import {v1} from 'uuid';


export type filterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const [filter, setFilter] = useState<filterValuesType>('all')

    const [error, setError] = useState<boolean>(false)



    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    function addTask(value: string) {
        let newTask: TaskType = {id: v1(), title: value, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(id: string, isDone: boolean) {
        debugger
        let task = tasks.find(t => t.id === id)

        if (task) {
            task.isDone = isDone
        }

        setTasks([...tasks])

    }

    let tasksForToDoList = tasks;

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    } else if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <ToDoList
                title={'What to learn'}
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                error={error}
                setError={setError}
                filter={filter}
            />
        </div>
    );
}


export default App;
