import {UPDATE_USER_INFO} from "../constants/action-types";

import {UPDATE_LOGIN_INFO} from "../constants/action-types";

export function updateUserInfo(payload){
    return {
        type : UPDATE_USER_INFO
        ,payload
    };
}

export function updateLoginInfo(payload){
    return {
        type : UPDATE_LOGIN_INFO
        ,payload
    };
}