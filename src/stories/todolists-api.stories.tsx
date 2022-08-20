import React, {useEffect, useState} from 'react';
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
    const [todolistID, setTodolistID] = useState<string>('')


    const getTask = () => {
        tasksAPI.getTasks(todolistID).then(res => setState(res.data))
    }


    return <div>
        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
        <button onClick={getTask}>Get Task</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)

    const [todolistID, setTodolistID] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const createTask = () => {
        tasksAPI.createTasks(todolistID, title).then(res => setState(res.data))
    }


    return <div>
        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>

        <button onClick={createTask}>create Task</button>
        <div>
            {JSON.stringify(state)}
        </div>
    </div>
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
            <input placeholder={'todolistID'} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete Task</button>
        </div>
    </div>
}


export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)

    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const updateTask = () => {
        tasksAPI.updateTasks(todolistID, taskID, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        }).then(res => setState(res.data))
    }


    return <div>
        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
        <input placeholder={'taskID'} value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={'description'} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input placeholder={'status'} value={status} onChange={(e) => setStatus(Number(e.currentTarget.value))}/>
        <input placeholder={'priority'} value={priority} onChange={(e) => setPriority(Number(e.currentTarget.value))}/>
        <input placeholder={'startDate'} value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
        <input placeholder={'deadline'} value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>

        <button onClick={updateTask}>Update Task</button>

        <div>
            {JSON.stringify(state)}
        </div>

    </div>
}