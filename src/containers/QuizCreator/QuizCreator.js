import React, {Component} from 'react';
import classes from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import {createFormControl, validateForm, validateInput} from "../../form/formFramework";
import {Input} from "../../components/UI/Input/Input";
import {Select} from "../../components/UI/Select/Select";
import {createQuiz, createQuizQuestion, writeToDb} from "../../store/acitons/createQuizActions";
import {connect} from "react-redux";



///////////////////////////////////////////LOCAL FUNCTIONS//////////////////////////////////////////////////////
const createOptionControl = (number) => {
    return createFormControl({
        label: `answer option ${number}`,
        errorMessage: 'answer not entered',
        id: number
    }, {required: true})


};

const createFormControls = () => {
    return {
        question: createFormControl({
            label: 'Enter question',
            errorMessage: 'answer not entered'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
};

//////////////////////////////////////////QUIZ CREATOR CLASS//////////////////////////////////////////////////////////
class QuizCreator extends Component {


    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = (e) => {
        e.preventDefault()
    };

    createQuestionHandler = (e) => {
        e.preventDefault();
        const {question, option1, option2, option3, option4} = this.state.formControls;
        //const quiz = [...this.state.quiz];
        //const index = quiz.length + 1;

        const questionItem = {
            id: this.props.quiz.length + 1,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuizQuestion(questionItem)


        // quiz.push(questionItem);
        this.setState({

            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })

    };

    createQuizHandler = async (e) => {
        e.preventDefault();

        this.setState({
            //quiz: [],
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })

        this.props.createQuiz();
    };

    changeInputHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validateInput(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    changeSelectHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName];
            //debugger
            return (
                <React.Fragment key={index}>
                    <Input label={control.label}
                           valid={control.valid}
                           shouldValidate={!!control.validation}
                           touched={control.touched}
                           errorMessage={control.errorMessage}
                           onChange={e => this.changeInputHandler(e.target.value, controlName)}
                           value={control.value}/>
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    };


//////////////RENDER//////////////RENDER//////////////RENDER//////////////RENDER//////////////RENDER/////////////
    render() {

        console.log(this.writeToDb);
        const select = <Select label={'select right answer'}
                               value={this.state.rightAnswerId}
                               options={[
                                   {text: 1, value: 1},
                                   {text: 2, value: 2},
                                   {text: 3, value: 3},
                                   {text: 4, value: 4}
                               ]}
                               onChange={this.changeSelectHandler}/>;
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h2> QuizCreator</h2>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button onClick={this.createQuestionHandler}
                                disabled={!this.state.isFormValid}
                                type={'primary'}>Create question</Button>
                        <Button onClick={this.createQuizHandler}
                                disabled={this.props.quiz.length === 0}
                                type={'primary'}> Create quiz</Button>

                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        quiz:state.quizCreator.quiz
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        createQuizQuestion: (question)=>dispatch(createQuizQuestion(question)),
        createQuiz: ()=>dispatch(createQuiz()),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
