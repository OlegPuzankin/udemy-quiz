import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {logout} from "../../store/acitons/authActions";
import {connect} from "react-redux";

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to={'/'}/>
        );
    }
}


export default connect(null, {logout})(Logout);
