import {userReducer} from './UserReducer';

test('user reducer should increment only age', () => {
    const startState = {age: 26, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(27)
    expect(endState.childrenCount).toBe(2)
})


test('user reducer should increment only childrenCount', () => {
    const startState = {age: 26, childrenCount: 2, name: 'Dimych'};

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(26)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
    const startState = {age: 26, childrenCount: 2, name: 'Dimych'};
    const newName = 'Denis'

    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.age).toBe(26)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe('Denis')
})