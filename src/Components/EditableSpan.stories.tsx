import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const callback = action('EditableSpan was changed')

export const EditableSpanBaseExample: ComponentStory<typeof EditableSpan> = () => {
    return <>
        <EditableSpan title={'Satrt Value'} changeTitle={callback}/>
    </>
}