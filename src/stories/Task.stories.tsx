import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../components/Task';
import {action} from '@storybook/addon-actions';
import {TaskPriority, TaskStatus} from '../api/api';

export default {
    title: 'Task Component',
    component: Task,
} as ComponentMeta<typeof Task>;

const callback = action('Task was changed')

export const TaskBaseExample: ComponentStory<typeof Task> = () => {
    return <>
        <Task task={
            {
                id: '2',
                title: 'JS 2',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            }}
              onStatusChangeHandler={callback}
              removeClickHandler={callback}
              changeTitleHandler={callback}
        />

        <Task task={
            {
                id: '2',
                title: 'React 2',
                status: TaskStatus.completed,
                description: 'string',
                priority: TaskPriority.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'string',
                order: 0,
                addedDate: 'string'
            }}
              onStatusChangeHandler={callback}
              removeClickHandler={callback}
              changeTitleHandler={callback}
        />
    </>
}




