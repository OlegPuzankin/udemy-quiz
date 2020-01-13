import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS, RESET_STATE, SET_ACTIVE_QUESTION,
    SET_ANSWER_STATE,
    SET_QUIZ_FINISHED
} from "../actionTypes/actionTypes";

const initialState = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    isLoading: true,
    error: null
};

export const quizReducer =(state = initialState, action)=>{
    switch (action.type){
        case FETCH_QUIZ_START:
            return{
                ...state,  isLoading: true
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
                isLoading: false
            };
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case SET_ANSWER_STATE:
            return{
                ...state, answerState: action.answerState,
            };
        case SET_QUIZ_FINISHED:
            return {
                ...state, isFinished: true
            };
        case SET_ACTIVE_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            };
        case RESET_STATE:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            };
        default:
            return state
    }
};