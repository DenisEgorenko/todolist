import {v1} from 'uuid';
import toDoListsReducer, {
    changeToDoListFilterAC,
    filterValuesType,
    toDoListDomainType, changeEntityStatusAC, fetchToDoListTC, removeToDoListTC, addToDoListTC, changeToDoListTitleTC
} from '../state/ToDoListsReducer';
import {toDoListType} from '../api/api';

test('correct todolist should be removed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const startState: Array<toDoListDomainType> = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]

    const endState = toDoListsReducer(startState, removeToDoListTC.fulfilled({listId: toDoList1}, '', ''))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoList2)
})


test('correct todolist should be added', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()


    const startState: Array<toDoListDomainType> = [
        {id: '1', title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: '2', title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]

    const endState = toDoListsReducer(startState, addToDoListTC.fulfilled({
        data: {
            id: '2',
            title: 'New',
            addedDate: '',
            order: 0
        }
    }, '', ''))


    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    let newToDoListTitle = 'New ToDoList'

    const startState: Array<toDoListDomainType> = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]

    const endState = toDoListsReducer(startState, changeToDoListTitleTC.fulfilled({
        listId: toDoList2,
        title: newToDoListTitle
    }, '', {title: '', listId: ''}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newToDoListTitle)
})

test('correct filter of todolist should be changed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    let newFilter: filterValuesType = 'completed'

    const startState: Array<toDoListDomainType> = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]

    const endState = toDoListsReducer(startState, changeToDoListFilterAC({listId: toDoList2, filter: newFilter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set', () => {


    let newFilter: filterValuesType = 'completed'

    const newToDoLists = [
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0},
    ]

    const startState: Array<toDoListDomainType> = []

    const endState = toDoListsReducer(startState, fetchToDoListTC.fulfilled({toDoLists: newToDoLists}, '', ''))

    expect(endState[0].filter).toBe('all')
    expect(endState.length).toBe(2)
})


test('entity status should be changed', () => {

    let toDoList1 = v1()
    let toDoList2 = v1()

    const startState: Array<toDoListDomainType> = [
        {id: toDoList1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: toDoList2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
    ]

    const endState = toDoListsReducer(startState, changeEntityStatusAC({listId: toDoList2, status: 'loading'}))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})