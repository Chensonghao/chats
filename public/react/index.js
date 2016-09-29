import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/app';
import configStore from './store/configStore';
import '../chats-style/style.scss';

var store = configStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('content')
);
