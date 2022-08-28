import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {App} from '../App';
import {store} from '../state/store';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const callback = action('AppWithRedux was changed')

export const AppWithReduxBaseExample: ComponentStory<typeof App> = () => {
    return <App demo={true}/>

}