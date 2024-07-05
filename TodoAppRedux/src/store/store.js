import { legacy_createStore as createStore,applyMiddleware,combineReducers } from "redux";
import { thunk } from "redux-thunk";
import todosReducer from "./todosReducer";

const rootReducer=combineReducers({
    todos:todosReducer
});

const store= createStore(rootReducer,applyMiddleware(thunk));
export default store;