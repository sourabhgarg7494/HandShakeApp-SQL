import loginInfoReducer from "./logininfo";
import userInfoReducer from "./userInfo";

import {combineReducers} from 'redux';

const finalReducers = combineReducers({
    loginInfo : loginInfoReducer
    ,userInfo : userInfoReducer
})

export default finalReducers;