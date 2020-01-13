import React, {Component} from 'react';
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import {Loader} from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/acitons/actions";


class QuizList extends Component {

    renderQuizes = () => {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
                </li>
            )
        })

    };
    componentDidMount = async () => {

        this.props.fetchQuizes();


    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h2>List of quizes</h2>
                    {
                        this.props.isLoading && this.props.quizes.length !== 0
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    quizes: state.quizList.quizes,
    isLoading: state.quizList.isLoading

});

const mapDispatchToProps = (dispatch) => ({
    fetchQuizes: () => dispatch(fetchQuizes())

});


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
