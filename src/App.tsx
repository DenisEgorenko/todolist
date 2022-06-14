import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from './Components/ToDoList';
import {v1} from 'uuid';


export type filterValuesType = 'all' | 'active' | 'completed'

type toDoListType = {
    id: string,
    title: string,
    filter: filterValuesType
}

function App() {

    let toDoList1 = v1()
    let toDoList2 = v1()


    let [toDoLists, setToDoLists] = useState<Array<toDoListType>>([
        {id: toDoList1, title: 'What to learn', filter: 'active'},
        {id: toDoList2, title: 'What to buy', filter: 'completed'}
    ])

    let [allTasks, setAllTasks] = useState({
            [toDoList1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: false}
            ],
            [toDoList2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'ReactJS', isDone: true}
            ]
        }
    )

    const [error, setError] = useState<boolean>(false)

    function removeTask(listId: string, id: string) {
        allTasks[listId] = allTasks[listId].filter(t => t.id !== id)

        setAllTasks({...allTasks})
    }

    function addTask(listId: string, value: string) {
        let newTask: TaskType = {id: v1(), title: value, isDone: false};
        allTasks[listId].unshift(newTask)
        setAllTasks({...allTasks})
    }

    function changeStatus(listId: string, id: string, isDone: boolean) {

        let task = allTasks[listId].find(t => t.id === id)

        if (task) {
            task.isDone = isDone
        }

        setAllTasks({...allTasks})

    }

    function changeFilter(value: filterValuesType, toDoListId: string) {
        let list = toDoLists.find(list => list.id === toDoListId)
        if (list) {
            list.filter = value
            setToDoLists([...toDoLists])
        }
    }

    const removeToDoList = (listId: string) => {
        toDoLists = toDoLists.filter(tl => tl.id !== listId)
        setToDoLists([...toDoLists])

        delete allTasks[listId]
        setAllTasks({...allTasks})
    }

    return (
        <div className="App">
            {toDoLists.map(list => {

                    let tasksForToDoList = allTasks[list.id];

                    if (list.filter === 'completed') {
                        tasksForToDoList = allTasks[list.id].filter(t => t.isDone === true)
                    } else if (list.filter === 'active') {
                        tasksForToDoList = allTasks[list.id].filter(t => t.isDone === false)
                    }

                    return <ToDoList
                        id={list.id}
                        title={list.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        error={error}
                        setError={setError}
                        filter={list.filter}
                        removeToDoList={removeToDoList}
                    />
                }
            )}

        </div>
    );
}


export default App;
