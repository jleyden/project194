import React from 'react';
import { connect } from 'react-redux';
import Secured from './Secured';
import Logins from './LoginandRegisterComponents/Login/index';
import Register from './LoginandRegisterComponents/Register/Register';
import firebase from 'firebase';

import Tutorial from './tutorial'



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
          if (this.props.tutorial) {
            return <Tutorial/>;
          } else {
            return <Secured />;
          }
        } else if (this.props.register) {
          return <Register/>
        } else {
          return <Logins />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register,
        tutorial: state.auth.tutorial
    };
}

export default connect(mapStateToProps)(Application);


