import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const initialStore = {}
export default function configureStore(initialState = initialStore, middlewares = []){
    return createStore(
        rootReducer,
        typeof(initialState) === 'object' ? initialState : initialState(),
        applyMiddleware(thunk, ...middlewares)
    )
}