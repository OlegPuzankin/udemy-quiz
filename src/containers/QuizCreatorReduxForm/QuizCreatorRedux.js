import React from 'react'
import classes from './QuizCreatorRedux.module.scss'
import {Field, reduxForm} from 'redux-form'
import {createQuiz, createQuizQuestion, resetQuizCreatorQuestion} from "../../store/acitons/createQuizActions";
import {connect} from "react-redux";
import Button from "../../components/UI/Button/Button";
import {RenderField} from "../../components/UI/RenderField/RenderField";
import {required} from "../../Validators/validateFunctions";
import {RenderSelect} from "../../components/UI/RenderSelect/RenderSelect";


const answersId = [1, 2, 3, 4];


class QuizCreatorRedux extends React.Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
    };

    submit = values => {
        debugger
        console.log(values)
    };

    createQuestionHandlerRedux = (values) => {
        debugger
        const questionItem = {
            id: this.props.quiz.length + 1,
            question: values.question,
            rightAnswerId: +values.rightAnswerId,
            answers: [
                {text: values.answer1, id: 1},
                {text: values.answer2, id: 2},
                {text: values.answer3, id: 3},
                {text: values.answer4, id: 4},
            ]
        }

        this.props.createQuizQuestion(questionItem);
        this.props.resetQuizCreatorQuestion();


        // quiz.push(questionItem);
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
        })

    };

    createQuizHandlerRedux = () => {
        debugger

        this.setState({
            //quiz: [],
            rightAnswerId: 1,


        })

        this.props.createQuiz();
    };

    render() {
        return (
            <div className={classes.QuizCreatorRedux}>
                <div>
                    <h2>Quiz creator based on ReduxForms</h2>
                    <QuizCreatorFormRedux onSubmit={this.submit}
                                          createQuiz={this.createQuizHandlerRedux}
                                          quiz={this.props.quiz}
                                          createQuestion={this.createQuestionHandlerRedux}/>
                </div>

            </div>
        )
    }


}

const QuizCreatorForm = (props) => {

    //console.log(props);

    return (
        <form onSubmit={props.handleSubmit}>

            <Field name="question" validate={[required]} component={RenderField} label={'enter question'} type="text"/>


            <Field name="answer1" validate={[required]} component={RenderField} label={'answer option 1'} type="text"/>
            <Field name="answer2" validate={[required]} component={RenderField} label={'answer option 2'} type="text"/>
            <Field name="answer3" validate={[required]} component={RenderField} label={'answer option 3'} type="text"/>
            <Field name="answer4" validate={[required]} component={RenderField} label={'answer option 4'} type="text"/>


            <Field name={"rightAnswerId"} component={RenderSelect} label={'Select right answer'} options={answersId}/>


            {/*<div>*/}
            {/*    <label>Select right answer</label>*/}
            {/*    <div>*/}
            {/*        <Field name="rightAnswerId" component="select">*/}
            {/*            <option> Select right answer</option>*/}
            {/*            {answersId.map(id => (*/}
            {/*                <option value={id} key={id}>*/}
            {/*                    {id}*/}
            {/*                </option>*/}
            {/*            ))}*/}
            {/*        </Field>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Button onClick={props.handleSubmit(values => props.createQuestion(values))}
                    type={'primary'}>Create question</Button>

            <Button onClick={props.createQuiz}
                    disabled={props.quiz.length === 0}
                    type={'success'}> Create quiz</Button>



        </form>
    )
};


let QuizCreatorFormRedux = reduxForm({form: 'quizCreator'})(QuizCreatorForm);


const mapStateToProps = (state) => {
    return {
        quiz: state.quizCreator.quiz
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createQuizQuestion: (question) => dispatch(createQuizQuestion(question)),
        createQuiz: () => dispatch(createQuiz()),
        resetQuizCreatorQuestion: () => dispatch(resetQuizCreatorQuestion())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreatorRedux)



