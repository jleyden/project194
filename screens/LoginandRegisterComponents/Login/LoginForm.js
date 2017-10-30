import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { register } from '../../../redux/actions/auth';
import Config from 'react-native-config';
import firebase from 'firebase';

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            route: 'Login',
            email: '',
            password: '',
            loginSuccessful: false
        };
    }
    userLogin (e) {
        e.preventDefault();
        this.signin();
        if (this.state.loginSuccessful) {
            this.setState({ loginSuccessful: false });
            this.props.onLogin(this.state.email, this.state.password);
        }
    }
    newUser (e) {
        this.props.onRegister();
        e.preventDefault();
    }
    signin(){
        this.setState({
            loading: true
        });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false, loginSuccessful: true }); })
            .catch(() => {
                alert("login failed");
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput
                    placeholder="email address"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="next"
                    style={ styles.input }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={ false }
                    onSubmitEditing={() => this.passwordInput.focus()}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={ false }
                    style={ styles.input }
                    secureTextEntry={ true }
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity onPress={(e) => this.userLogin(e)} title={this.state.route} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => this.newUser(e)} style={styles.newUserButton}>
                    <Text style={styles.buttonText}>NEW USER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => { dispatch(login(email, password)); },
        onRegister: () => { dispatch(register()); },
        onSignUp: (email, password) => { dispatch(signup(email, password)); }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    formText: {
        color: 'white',
        fontWeight: '500',
        padding: 10,
        opacity: 1
    },
    bigText: {
        color: 'white',
        fontSize: 60,
        opacity: 1
    },
    buttonContainer: {
        backgroundColor: '#336E7B',
        paddingVertical: 15,
        marginBottom: 0,

    },
    newUserButton: {
        paddingVertical: 15,
        marginBottom: 10,

    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);