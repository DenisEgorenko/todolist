import {
    TasksReducer,
    TasksStateType
} from "./TasksReducer";
import {addToDoListAC, toDoListsReducer, toDoListDomainType} from "./ToDoListsReducer";

test('ids should be equal', () => {

    const startTasksState: TasksStateType = {};
    const startToDoListState: Array<toDoListDomainType> = [];

    const action = addToDoListAC({id: '4', title: 'New', addedDate: '', order: 0})

    const endTasksState = TasksReducer(startTasksState, action)
    const endToDoListState = toDoListsReducer(startToDoListState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromToDoList = endToDoListState[0].id

    expect(idFromTasks).toBe('4')
    expect(idFromToDoList).toBe('4')


})



