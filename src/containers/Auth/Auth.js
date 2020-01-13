import React, {Component} from 'react';
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button";
import {Input} from "../../components/UI/Input/Input";
import is from 'is_js'
import {connect} from "react-redux";
import {authorizeUser} from "../../store/acitons/authActions";



class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: "Incorrect e-mail",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: "Incorrect password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }

    };

    submitHandler = event => {
        event.preventDefault()
    };

    loginHandler = () => {

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        };

        this.props.authorizeUser(authData, true)


        // const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
        // console.log(response);

    };

    registerHandler = () => {
        debugger

        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        };

        this.props.authorizeUser(authData, false)

        // const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);
        // console.log(response);
    };

    static validateControl(value, validation) {

        if (!validation)
            return true;
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid

        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;

    }


    onChangeHandler = (e, controlName) => {
        //console.log(controlName, e.target.value);
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = e.target.value;
        control.touched = true;
        control.valid = Auth.validateControl(control.value, control.validation);
        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });
        this.setState({formControls, isFormValid})
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Input key={controlName + index}
                       type={control.type}
                       label={control.label}
                       valid={control.valid}
                       touched={control.touched}
                       shouldValidate={!!control.validation}
                       errorMessage={control.errorMessage}
                       onChange={e => this.onChangeHandler(e, controlName)}
                       value={control.value}/>

            )
        })
    }

    //////////////////////////////RENDER////////////////////////////////////////////

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h2>Authorization form</h2>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        {/*<Input type={'email'} label={'E-mail'} errorMessage={'test message'}/>*/}
                        {/*<Input type={'text'} label={'Password'}/>*/}
                        <div className={classes.Buttons}>
                            <Button type="success"
                                    disabled={!this.state.isFormValid}
                                    onClick={this.loginHandler}>Login </Button>
                            <Button type="primary"
                                    disabled={!this.state.isFormValid}
                                    onClick={this.registerHandler}>Register</Button>
                        </div>

                    </form>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authorizeUser: (authData, isLogin) => dispatch(authorizeUser(authData, isLogin))

    }
};
export default connect(null, mapDispatchToProps)(Auth);
