import {v1} from 'uuid';
import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    filterValuesType,
    removeToDoListAC,
    toDoListsReducer,
    toDoListDomainType, setToDoListAC
} from './ToDoListsReducer';
import {toDoListType} from '../api/api';

test('correct todolist should be removed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const startState: Array<toDoListDomainType>  = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'},
    ]

    const endState = toDoListsReducer(startState, removeToDoListAC(toDoList1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoList2)
})


test('correct todolist should be added', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()


    const startState: Array<toDoListDomainType>  = [
        {id: '1', title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: '2', title: 'What to buy', addedDate: '', order: 0, filter: 'all'},
    ]

    const endState = toDoListsReducer(startState, addToDoListAC({id: '2', title: 'New', addedDate: '', order: 0}))


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    let newToDoListTitle = 'New ToDoList'

    const startState: Array<toDoListDomainType>  = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'},
    ]

    const endState = toDoListsReducer(startState, changeToDoListTitleAC(toDoList2, newToDoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newToDoListTitle)
})

test('correct filter of todolist should be changed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    let newFilter: filterValuesType = 'completed'

    const startState: Array<toDoListDomainType>  = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'},
    ]

    const endState = toDoListsReducer(startState, changeToDoListFilterAC(toDoList2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set', () => {



    let newFilter: filterValuesType = 'completed'

    const newToDoLists = [
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0},
    ]

    const startState: Array<toDoListDomainType>  = [

    ]

    const endState = toDoListsReducer(startState, setToDoListAC(newToDoLists))

    expect(endState[0].filter).toBe('all')
    expect(endState.length).toBe(2)
})