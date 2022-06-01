import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./Components/ToDoList";
import {v1} from 'uuid';



export type filterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const [tasks2, setTasks2] = useState<Array<TaskType>>([
        {id: v1(), title: "Do", isDone: true},
        {id: v1(), title: "Your", isDone: false},
        {id: v1(), title: "Work", isDone: false}
    ])


    const [filter, setFilter] = useState<filterValuesType>("all")

    function removeTask1 (id: string) {
        setTasks1(tasks1.filter(t => t.id !== id))
    }

    function removeTask2 (id: string) {
        setTasks2(tasks2.filter(t => t.id !== id))
    }

    function changeFilter (value: filterValuesType) {
        setFilter(value)
    }

    function addTask (value: string) {
        let newTask:TaskType = {id: v1(), title: value, isDone: false};
        let newTasks = [newTask, ...tasks1]
        setTasks1(newTasks)
    }


    let tasksForToDoList = tasks1;

    if(filter === "completed"){
        tasksForToDoList = tasks1.filter(t => t.isDone===true)
    } else if (filter === "active"){
        tasksForToDoList = tasks1.filter(t => t.isDone===false)
    }

    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasksForToDoList} removeTask={removeTask1} changeFilter={changeFilter} addTask={addTask}/>
            <ToDoList title={"Songs"} tasks={tasks2} removeTask={removeTask2} changeFilter={changeFilter} addTask={addTask}/>
            <ToDoList title={"Books"} tasks={tasks1} removeTask={removeTask1} changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}


export default App;
