import React from 'react';
import { connect } from 'react-redux';
import Secured from './Secured';
import Login from './LoginandRegisterComponents/Login/Login';
import Register from './LoginandRegisterComponents/Register/Register';
import firebase from 'firebase';



class Application extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCyMpjgbuOf2tVH6aOKYxg3jMOG7nQPlSA",
            authDomain: "joul-3afc1.firebaseapp.com",
            databaseURL: "https://joul-3afc1.firebaseio.com",
            projectId: "joul-3afc1",
            storageBucket: "joul-3afc1.appspot.com",
            messagingSenderId: "870174821785"
        })
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Secured />;
        } else if (this.props.register) {
            return <Register/>
        } else {
            return <Login />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register
    };
}

export default connect(mapStateToProps)(Application);


