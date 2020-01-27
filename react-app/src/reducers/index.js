import {combineReducers} from 'redux';

import {chartReducer} from './chart.reducer';

import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    chartReducer,
    form: formReducer
});

export default rootReducer;

