import {createStore , combineReducers} from 'redux'
import Reducer from './Reducers/Reducer.js';

let reducer = combineReducers({reducer : Reducer})

let store = createStore(reducer)

export default store