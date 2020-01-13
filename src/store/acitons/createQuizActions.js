import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from "../actionTypes/actionTypes";
import axiosInstance from "../../axios/axiosInstance";
import {reset} from 'redux-form';

////////////////////////////////////ACTIONS///////////////////////////
export const createQuizQuestion = (question) => ({
    type: CREATE_QUIZ_QUESTION,
    question
});

export const resetQuizCreator = () => ({
    type: RESET_QUIZ_CREATOR,
});


/////////////////////THUNKS//////////////////////////////////////

export const createQuiz = () => {
    return async (dispatch, getState) => {
        dispatch(reset('quizCreator'));
        const quiz = getState().quizCreator.quiz;
        debugger
        await axiosInstance.post(`/quizes.json`, quiz);
        debugger
        const resp = await axiosInstance.patch(`/country.json`, {fr: 'france'});
        debugger

        dispatch(resetQuizCreator());

    }
};


export const resetQuizCreatorQuestion = () => {
    return dispatch => {
        dispatch(reset('quizCreator'));
    }
}


