import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actionTypes/actionTypes";


const initialState = {
    isLoading: false,
    quizes: [],
    error: null
}

export const quizListReducer=(state=initialState, action)=>{
    //debugger

    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_QUIZES_SUCCESS:
            //debugger
            return {
                ...state,
                quizes: action.quizes,
                isLoading: false
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state

    }
}