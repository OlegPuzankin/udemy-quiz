import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from 'redux-thunk'
import {quizListReducer} from "./reducers/quizListReducer";
import {quizReducer} from "./reducers/quizReducer";
import {quizCreatorReducer} from "./reducers/quizCreatorReducer";
import {authReducer} from "./reducers/authReducer";
import { reducer as formReducer } from 'redux-form'


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const combinedReduces = combineReducers({
    quizList: quizListReducer,
    quiz: quizReducer,
    quizCreator: quizCreatorReducer,
    auth: authReducer,
    form: formReducer
});

export const store=createStore(combinedReduces, composeEnhancers(applyMiddleware(thunkMiddleware)));

