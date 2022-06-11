import { combineReducers } from "redux";
import currentUser from "./currentUser";
import loadingState from "./loadingState";
import menuState from "./menuState";

export default combineReducers({
    currentUser,
    loadingState,
    menuState
})