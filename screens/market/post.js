import React from 'react';
import { StyleSheet, Text, View,
	TouchableOpacity, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Container, Header, Content, Title } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Post extends React.Component {

	static navigationOptions = {
		headerTitle: 'Post for sale',
	}

  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      user: '',
    };
    this.firestore = firebase.firestore()
	  this.posting = false
  }

  componentDidMount() {
    this.setState({
      user: this.props.screenProps.user,
    })
  }

  checkFields() {
		if (!this.state.title) {
			Alert.alert('Please insert a title')
		} else if (!this.state.price) {
			Alert.alert('Please insert a price')
		} else if (!this.state.description) {
			Alert.alert('Please insert a description')
		} else {
			this.savePosting();
		}
  }

  savePosting() {
    console.log("saving posting");
    let timestamp = new Date();
    this.firestore.collection('market').add({
      available: true,
	    title: this.state.title,
      time: timestamp,
      description: this.state.description,
      price: this.state.price,
      user: this.props.screenProps.fireStoreRefs.user,
    }).then((docRef) => {
      this.refPostToUser(timestamp, docRef);
    })
      .catch(function(error) {
	      Alert.alert(
		      'Error',
		      'Please try again later'
	      )
	      console.error("Error adding document: ", error);
      });
  }

  refPostToUser(timestamp, docref) {
		if (this.posting) {
			return
		}
		this.posting = true
		const backAction = NavigationActions.back({
			key: null
		})
	  this.firestore.collection(`users/${this.state.user.uid}/items`).add({
        Time: timestamp,
        DocRef: docref,
    }).then(function(docRef) {
      Alert.alert(
        'Success',
	      'Posted to market!',
	      [
		      {text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}
	      ]
      )
      console.log("Document written with ID: ", docRef.id);
    }.bind(this))
        .catch(function(error) {
          Alert.alert(
            'Error',
	          'Please try again later'
          )
            console.error("Error adding document: ", error);
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
                        placeholder="Title"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        onSubmitEditing={() => this.priceInput.focus()}
                    />
                    <TextInput
                        placeholder="Price"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.input}
                        keyboardType='numeric'
                        autoCorrect={false}
                        value={this.state.price}
                        onChangeText={(text) => this.setState({ price: parseFloat(text) })}
                        ref={(input) => this.priceInput = input}
                        onSubmitEditing={() => this.descriptionInput.focus()}
                    />
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        returnKeyType="next"
                        style={styles.description}
                        value={this.state.password}
                        multiline={true}
                        onChangeText={(text) => this.setState({ description: text })}
                        ref={(input) => this.descriptionInput = input}
                        // onSubmitEditing={() => this.confirmPasswordInput.focus()}
                    />
                    <TouchableOpacity onPress={() => this.checkFields()} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>POST</Text>
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
    description: {
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 20,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        fontSize: 17
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