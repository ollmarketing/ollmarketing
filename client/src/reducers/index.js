import { combineReducers } from 'redux';
import authReducer from './auth';
import blogReducer from './blog';
import reportReducer from './report';
import brokerReducer from './broker';
import ideaReducer from './idea';
import traderReducer from './trader';
import priceReducer from './price';

export default combineReducers({
    auth: authReducer,
    blog: blogReducer,
    broker: brokerReducer,
    report: reportReducer,
    idea: ideaReducer,
    trader: traderReducer,
    price: priceReducer,
});