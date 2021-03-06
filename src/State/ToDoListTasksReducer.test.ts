import {
    TasksReducer,
    TasksStateType
} from "./TasksReducer";
import {addToDoListAC, toDoListsReducer, toDoListType} from "./ToDoListsReducer";

test('ids should be equal', () => {

    const startTasksState: TasksStateType = {};
    const startToDoListState: Array<toDoListType> = [];

    const action = addToDoListAC('NewToDoList')

    const endTasksState = TasksReducer(startTasksState, action)
    const endToDoListState = toDoListsReducer(startToDoListState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromToDoList = endToDoListState[0].id

    expect(idFromTasks).toBe(action.newId)
    expect(idFromToDoList).toBe(action.newId)


})



