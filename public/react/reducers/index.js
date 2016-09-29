import {combineReducers} from 'redux';
import messages from './messages';
import user from './user';

const rootReducer = combineReducers({
    user,
    messages
})

export default rootReducer;
