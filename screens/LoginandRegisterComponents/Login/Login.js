import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from './LoginForm';
export default class Login extends React.Component {

  static navigationOptions = {
    header: null
  }
    render() {
        return (
            <KeyboardAwareScrollView
                behavior="padding"
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                <View style ={styles.logoContainer}>
                    <Text style={styles.bigText}>JOUL</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reset', {})} style={styles.newUserButton}>
                    <Text style={styles.buttonText}>Forgot password</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009688',
        justifyContent: 'center',
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
    },
    formContainer: {
        height: 160,
    },
    bigText: {
        color: 'white',
        fontSize: 60,
        opacity: 1
    },
  newUserButton: {
    paddingVertical: 15,
    marginTop: 60,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});