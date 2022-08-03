import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {AppWithRedux} from './AppWithRedux';
import {store} from './State/store';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const callback = action('AppWithRedux was changed')

export const AppWithReduxBaseExample: ComponentStory<typeof AppWithRedux> = () => {
    return <AppWithRedux />

}