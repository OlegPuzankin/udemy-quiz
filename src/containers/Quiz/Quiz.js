import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import {withRouter} from "react-router-dom";
import {Loader} from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {answerClickHandler, fetchQuizById, resetState} from "../../store/acitons/actions";
import {compose} from "redux";
import cn from 'classnames'

class Quiz extends Component {

    retryHandler = () => {
        debugger
        this.props.resetState();
    };

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    render() {
        //console.log(this.props);
        //console.log ('quiz', this.props.quiz);
        //console.log(cn({[classes.Quiz]: true, [classes.loading]: this.props.isLoading}));
        return (
            <div className={cn({[classes.Quiz]:true, [classes.loading]: this.props.isLoading})}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.isLoading || !this.props.quiz
                            ? <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.answerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                answerState={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        isLoading: state.quiz.isLoading
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchQuizById: id => dispatch(fetchQuizById(id)),
//         answerClickHandler: answerId => dispatch(answerClickHandler(answerId)),
//         retryQuiz: ()=>dispatch(resetState())
//
//     }
// };

export default compose(withRouter, connect(mapStateToProps, {fetchQuizById, answerClickHandler, resetState}))(Quiz);