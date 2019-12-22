import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import fetchNotesReducer from './redux/Reducers/fetch_notes';
import postNotesReducer from './redux/Reducers/post_notes';
import userReducer from './redux/Reducers/user';
import authReducer from './redux/Reducers/auth';
import searchReducer from './redux/Reducers/search';
import foldersReducer from './redux/Reducers/folders';
import darkModeReducer from './redux/Reducers/dark_mode';

export default createStore(
    combineReducers({
        fetchNotesReducer,
        postNotesReducer,
        userReducer,
        authReducer,
        searchReducer,
        foldersReducer,
        darkModeReducer
    }),
    {},
    applyMiddleware(thunk)
)