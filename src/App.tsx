import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./Components/ToDoList";



export type filterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const [tasks2, setTasks2] = useState<Array<TaskType>>([
        {id: 4, title: "Do", isDone: true},
        {id: 5, title: "Your", isDone: false},
        {id: 6, title: "Work", isDone: false}
    ])


    const [filter, setFilter] = useState<filterValuesType>("all")

    function removeTask1 (id: number) {
        setTasks1(tasks1.filter(t => t.id !== id))
    }

    function removeTask2 (id: number) {
        setTasks2(tasks2.filter(t => t.id !== id))
    }

    function changeFilter (value: filterValuesType) {
        setFilter(value)
    }


    let tasksForToDoList = tasks1;

    if(filter === "completed"){
        tasksForToDoList = tasks1.filter(t => t.isDone===true)
    } else if (filter === "active"){
        tasksForToDoList = tasks1.filter(t => t.isDone===false)
    }

    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasksForToDoList} removeTask={removeTask1} changeFilter={changeFilter}/>
            <ToDoList title={"Songs"} tasks={tasks2} removeTask={removeTask2} changeFilter={changeFilter}/>
            <ToDoList title={"Books"} tasks={tasks1} removeTask={removeTask1} changeFilter={changeFilter}/>
        </div>
    );
}


export default App;
