import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Task Component',
    component: Task,
} as ComponentMeta<typeof Task>;

const callback = action('Task was changed')

export const TaskBaseExample: ComponentStory<typeof Task> = () => {
    return <>
        <Task task={
            {
                id: '1',
                title: 'CSS',
                isDone: false
            }}
              onStatusChangeHandler={callback}
              removeClickHandler={callback}
              changeTitleHandler={callback}
        />

        <Task task={
            {
                id: '21',
                title: 'JS',
                isDone: true
            }}
              onStatusChangeHandler={callback}
              removeClickHandler={callback}
              changeTitleHandler={callback}
        />
    </>
}




