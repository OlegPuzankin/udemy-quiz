import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from "../actionTypes/actionTypes";

const initialState = {
    quiz: []
};

export const quizCreatorReducer=(state =initialState, action)=>{

    switch (action.type) {

        case CREATE_QUIZ_QUESTION:
            return{
                ...state, quiz: [...state.quiz, action.question]
            };
        case RESET_QUIZ_CREATOR:
            return{
                ...state, quiz: []
            };


        default:
            return state

    }
};