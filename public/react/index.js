import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/app';
import configStore from './store/configStore';
import '../common/css/style.scss';
import { getUser } from './actions';

let store = configStore();
let socket = io.connect('/');
store.dispatch(getUser(socket));
render(
    <Provider store={store}>
        <App socket={socket}/>
    </Provider>,
    document.getElementById('content')
);
