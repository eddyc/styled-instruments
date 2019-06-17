import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import AppReducer from "../App/reducer";
import MainReducer from "../containers/Main/reducer";
import CsoundReducer from "../lib/reducer";
export default history =>
    combineReducers({
        AppReducer,
        MainReducer,
        CsoundReducer,
        router: connectRouter(history)
    });
