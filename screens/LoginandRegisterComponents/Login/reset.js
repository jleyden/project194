import React from 'react';
import { StyleSheet, Text, View,
  TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Container, Header, Content, Title } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Reset extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#336E7B',
    },
    headerTintColor: '#FFFFFF'
  }

  constructor() {
    super()
    this.state = {
      email: '',
    };
    this.firestore = firebase.firestore()
  }

  componentDidMount() {
  }

  checkFields() {
    var errorMessage = ""
    if (!this.state.email) {
      errorMessage = errorMessage.concat("Email field is empty. ");
    } else if (this.state.email.indexOf('@') < 1) {
      errorMessage = errorMessage.concat("This email is invalid. ");
    }
    if (errorMessage) {
      Alert.alert(errorMessage)
    } else {
      this.containsEmail()
    }
  }

  containsEmail() {
    const docRef = this.firestore.collection("users")
    var searched = docRef.where("email", "==", this.state.email).onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
            Alert.alert(
                'There is no user with this email address.',
                '',
                [
                  {text: 'OK', onPress: () => {}}
                ]
            )
          } else {
           this.sendEmail()
          }
        }
    )
  }

  sendEmail() {
    const backAction = NavigationActions.back({
      key: null
    })
    var auth = firebase.auth();
    var emailAddress = this.state.email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      Alert.alert(
          'Password reset email has been sent.',
          '',
          [
            {text: 'OK', onPress: () => {}}
          ]
      )
    }).catch(function(error) {

    });
  }


  render() {
    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}>
          <View>
            <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.8)"
                returnKeyType="done"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                onSubmitEditing={() => this.checkFields()}
            />
            <TouchableOpacity onPress={() => this.checkFields()} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Send email</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 20,
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
});