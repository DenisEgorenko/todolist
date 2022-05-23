import React from 'react';
import './App.css';
import ToDoList from "./Components/ToDoList";

function App() {

    const tasks1 = [
        {id:1, title: "HTML&CSS", isDone: true},
        {id:2, title: "JS", isDone: true},
        {id:3, title: "ReactJS", isDone: false}
    ]

    const tasks2 = [
        {id:4, title: "Hello world", isDone: true},
        {id:5, title: "I am Happy", isDone: false},
        {id:6, title: "Yo", isDone: false}
    ]

    const tasks3 = [
        {id:7, title: "String", isDone: true},
        {id:8, title: "Number", isDone: false},
        {id:9, title: "Boolean", isDone: true}
    ]


    return (
        <div className="App">
            <ToDoList title={"What to learn"} tasks={tasks1}/>
            <ToDoList title={"Songs"} tasks={tasks2}/>
            <ToDoList title={"Books"} tasks={tasks3}/>
        </div>
    );
}


export default App;
