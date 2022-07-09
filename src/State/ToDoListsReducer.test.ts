import {userReducer} from './UserReducer';
import {v1} from 'uuid';
import {useState} from 'react';
import {filterValuesType, toDoListType} from '../App';
import {toDoListsReducer} from './ToDoListsReducer';

test('correct todolist should be removed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const startState: Array<toDoListType>  = [
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: toDoList1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoList2)
})


test('correct todolist should be added', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const newId = v1()

    let newToDoListTitle = 'New ToDoList'

    const startState: Array<toDoListType>  = [
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, {type: 'ADD-TODOLIST', title: newToDoListTitle, newId: newId})

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newToDoListTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const newId = v1()

    let newToDoListTitle = 'New ToDoList'

    const startState: Array<toDoListType>  = [
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: toDoList2,
        title: newToDoListTitle
    }

    const endState = toDoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newToDoListTitle)
})

test('correct filter of todolist should be changed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const newId = v1()

    let newFilter: filterValuesType = 'completed'

    const startState: Array<toDoListType>  = [
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: toDoList2,
        filter: newFilter
    }

    const endState = toDoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})