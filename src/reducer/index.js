import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import events from './events';

export default combineReducers({
    events, //reducerから受け取ったもの
    form
})

