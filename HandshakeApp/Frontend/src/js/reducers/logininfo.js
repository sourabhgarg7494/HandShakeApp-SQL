import {UPDATE_LOGIN_INFO} from "../constants/action-types";

const initialLoginData = {
    UserEmail : ""
    ,loginStatus:""
}

var loginInfoReducer = (state = initialLoginData, action) => {
    if (action.type === UPDATE_LOGIN_INFO){
        return Object.assign(state, action.payload); 
    }
    return state;
}

export default loginInfoReducer;