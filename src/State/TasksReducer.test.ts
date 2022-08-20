import {addTaskAC, removeTaskAC, setTasksAC, TasksReducer, TasksStateType, updateTaskAC} from './TasksReducer';
import {removeToDoListAC, setToDoListAC} from './ToDoListsReducer';
import {TaskPriority, TaskStatus, updateTaskType} from '../api/api';


test('correct task should be deleted from correct array', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '2', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
            {
                id: '3', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    }

    const endState = TasksReducer(startState, removeTaskAC('todolistId2','2' ))

    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
    expect(endState['todolistId2'][1].id).toBe('3')

})

test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    }

    const endState = TasksReducer(startState, addTaskAC( {
        id: '1',
        title: 'juice',
        status: TaskStatus.InProgress,
        description: 'string',
        priority: TaskPriority.Low,
        startDate: 'string',
        deadline: 'string',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: 'string'
    }))

    expect(endState['todolistId1'].length).toBe(1)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatus.InProgress)

})

test('status of specified task should be changed', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        'todolistId2': [
            {
                id: '2',
                title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    }

    const upTask: updateTaskType = {
        title: 'Vue',
        status: TaskStatus.InProgress,
        description: 'string',
        priority: TaskPriority.Low,
        startDate: 'string',
        deadline: 'string',
    }

    const endState = TasksReducer(startState, updateTaskAC('todolistId2', '2', upTask))

    expect(endState['todolistId2'][0].status).toBe(TaskStatus.InProgress)
    expect(endState['todolistId1'][0].status).toBe(TaskStatus.completed)
})

test('title of specified task should be changed', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'JS',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        'todolistId2': [
            {
                id: '2', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    }

    const upTask: updateTaskType = {
        title: 'MilkyWay',
        status: TaskStatus.completed,
        description: 'string',
        priority: TaskPriority.Low,
        startDate: 'string',
        deadline: 'string',
    }

    const endState = TasksReducer(startState, updateTaskAC('todolistId2', '2', upTask))

    expect(endState['todolistId2'][0].title).toBe('MilkyWay')
    expect(endState['todolistId1'][0].title).toBe('JS')
})

test('property with todolist should be deleted', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ],
        'todolistId2': [
            {
                id: '2', title: 'Vue',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            },
        ]
    }

    const endState = TasksReducer(startState, removeToDoListAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


test('property with todolist should be deleted', () => {


    const action = setToDoListAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0},
    ])

    const endState = TasksReducer({}, action)


    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})


test('Tasks should be added', () => {


    const tasks = [

        {
            id: '1',
            title: 'HTML&CSS',
            status: TaskStatus.completed,
            description: 'string',
            priority: TaskPriority.Low,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 0,
            addedDate: 'string'
        },
        {
            id: '2',
            title: 'React',
            status: TaskStatus.completed,
            description: 'string',
            priority: TaskPriority.Low,
            startDate: 'string',
            deadline: 'string',
            todoListId: 'string',
            order: 0,
            addedDate: 'string'
        },
    ]


    const action = setTasksAC('1', tasks)

    const endState = TasksReducer({['1']: [], ['2']: []}, action)


    expect(endState['1'].length).toBe(2)
    expect(endState['2']).toStrictEqual([])
})