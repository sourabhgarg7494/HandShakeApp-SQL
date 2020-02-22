import {UPDATE_USER_INFO} from "../constants/action-types";

const initialUserData = {
    UserEmail : ""
    ,Userrole : ""
    ,Name : ""
}

var userInfoReducer = (state = initialUserData, action) => {
    if (action.type === UPDATE_USER_INFO){
        return Object.assign(state, action.payload); 
    }
    return state;
}

export default userInfoReducer;