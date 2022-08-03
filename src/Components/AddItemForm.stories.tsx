import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample: ComponentStory<typeof AddItemForm> = () => <AddItemForm addItem={callback}/>




