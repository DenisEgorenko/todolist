import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {tasksAPI, toDoListsAPI} from '../api/api';


export default {
    title: 'API'
}


export const GetToDoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        toDoListsAPI.getToDoLists().then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateToDoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        toDoListsAPI.createToDoList('List 1').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteToDoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '793e1267-50ff-42df-95a6-a854e94b7388'

        toDoListsAPI.deleteToDoLists(todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateToDoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '793e1267-50ff-42df-95a6-a854e94b7388'

        toDoListsAPI.updateToDoLists(todolistId, 'list New').then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const toDoListId = '1346d6d5-ba81-461a-9d72-11798fe76ef3'
    useEffect(() => {
        tasksAPI.getTasks(toDoListId).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const toDoListId = '1346d6d5-ba81-461a-9d72-11798fe76ef3'
    useEffect(() => {
        tasksAPI.createTasks(toDoListId, 'newTask').then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')


    const deleteTask = () => {
        tasksAPI.deleteTasks(todolistID, taskID).then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e)=>setTodolistID(e.currentTarget.value)} />
            <input placeholder={'taskID'} value={taskID} onChange={(e)=>setTaskID(e.currentTarget.value)} />
            <button onClick={deleteTask}>delete Task</button>
        </div>
    </div>
}


export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const toDoListId = '1346d6d5-ba81-461a-9d72-11798fe76ef3'
    const taskId = 'fe670a28-6c1e-4bd8-91b6-27c0047cbfe7'

    useEffect(() => {
        tasksAPI.updateTasks(toDoListId, taskId).then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}