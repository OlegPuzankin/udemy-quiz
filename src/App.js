import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Redirect, Route, Switch} from 'react-router-dom'
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/acitons/authActions";
import QuizCreatorRedux from "./containers/QuizCreatorReduxForm/QuizCreatorRedux";



class App extends Component {


    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        //console.log('app log', this.props);

        let routes = (
            <Switch>
                <Route path={'/'} exact>
                    <QuizList/>
                </Route>

                <Route path={'/auth'}>
                    <Auth/>
                </Route>

                <Route path={'/quiz/:id'}>
                    <Quiz/>
                </Route>

                <Redirect to={'/'}/>
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes=(
                <Switch>
                    <Route path={'/'} exact>
                        <QuizList/>
                    </Route>

                    <Route path={'/quiz-creator'}>
                        <QuizCreator/>
                    </Route>

                    <Route path={'/quiz-creator-redux'}>
                        <QuizCreatorRedux/>
                    </Route>

                    <Route path={'/quiz/:id'}>
                        <Quiz/>
                    </Route>

                    <Route path={'/logout'}>
                        <Logout/>
                    </Route>

                    <Redirect to={'/'}/>
                </Switch>
            )
        }
        return (
            <Layout>
                <Switch>
                    {routes}
                </Switch>
            </Layout>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: !!state.auth.token
});


//export default compose(withRouter, connect(mapStateToProps))(App);

export default connect(mapStateToProps, {autoLogin})(App)
