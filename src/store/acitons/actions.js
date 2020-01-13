import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    RESET_STATE,
    SET_ACTIVE_QUESTION,
    SET_ANSWER_STATE,
    SET_QUIZ_FINISHED
} from "../actionTypes/actionTypes";
import axiosInstance from "../../axios/axiosInstance";

////////////////////////////start///////////////////////
const fetchQuizesStart=()=>{
    return{
    type:FETCH_QUIZES_START
    }
};

const fetchQuizStart=()=>{
    return{
        type:FETCH_QUIZ_START
    }
};

////////////////////////////success actions///////////////////////

const fetchQuizesSuccess=(quizes)=>{
    return{
        type:FETCH_QUIZES_SUCCESS, quizes
    }
};

const fetchQuizSuccess=(quiz)=>{
    return{
        type:FETCH_QUIZ_SUCCESS, quiz
    }
};

////////////////////////////error actions///////////////////////

const fetchQuizesError=(error)=>{
    return{
    type:FETCH_QUIZES_ERROR, error
    }
};

const fetchQuizError=(error)=>{
    return{
        type:FETCH_QUIZ_ERROR, error
    }
};

const setAnswerState = (answerState, results)=>({
    type: SET_ANSWER_STATE,
    answerState,
    results});

const setQuizFinished = ()=>({
    type: SET_QUIZ_FINISHED,

});

const setActiveQuestion= (activeQuestion)=>({
    type: SET_ACTIVE_QUESTION,
    activeQuestion
});

export const resetState = ()=>({
    type: RESET_STATE
});


////////////////////////////THUNKS////////////////////////////


export const fetchQuizes = ()=>{

    return async (dispatch)=> {
        dispatch(fetchQuizesStart());
        try {
        //debugger
            const response = await axiosInstance.get('/quizes.json');
            let quizes = [];
            Object.keys(response.data).forEach((quiz, index) => {
                quizes.push({
                    id: quiz,
                    name: `Test ${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes))
            //debugger
            // this.setState({
            //     isLoading: false,
            //     quizes
            // });
            //console.log(response);
        } catch (e) {
            fetchQuizesError(e)

        }
    }
};

export const fetchQuizById=(quizId)=>{
    return async dispatch=>{

        dispatch(fetchQuizStart());
        try {
            const response = await axiosInstance.get(`/quizes/${quizId}.json`);
            dispatch(fetchQuizSuccess(response.data))
            // this.setState({
            //     quiz: response.data,
            //     isLoading:false
            // })

        } catch (error) {
            dispatch (fetchQuizError(error))
        }
    }
};

export const answerClickHandler =(answerId)=>{
    return (dispatch, getState)=>{


        const quizState = getState().quiz;
        //debugger

        if (quizState.answerState) {
            const key = Object.keys(quizState.answerState)[0];
            if (quizState.answerState[key] === 'success') {
                return
            }
        }

        const question = quizState.quiz[quizState.activeQuestion];
        const results = quizState.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(setAnswerState({[answerId]: 'success'}, results));


            const timeout = window.setTimeout(() => {
                if (isQuizFinished(quizState)) {
                    dispatch(setQuizFinished())
                }
                else {
                    dispatch(setActiveQuestion(quizState.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error';
            dispatch(setAnswerState({[answerId]: 'error'}, results))
            const timeout=setTimeout(()=>{
                dispatch(setAnswerState({[answerId]: 'none'}, results));
                clearTimeout(timeout)
            }, 1200)
        }
    };

};

/////////////////////////////////////////LOCAL FUNCTIONS//////////////////////////////////////

let isQuizFinished=(state)=>{
    return state.activeQuestion + 1 === state.quiz.length
};
