import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import 'firebase/firestore';

export default class Item extends React.Component {

  static navigationOptions = {
    headerTitle: 'For Sale',
  }

  constructor() {
    super()
    this.state = {
      user: null,
      userData: null,
      seller: null,
      sellerData: null,
    }
    this.firestore = firebase.firestore()
  }

  componentWillMount() {
	  const sellerRef =  this.props.navigation.state.params.sellerRef
	  this.loadSeller(sellerRef)
  }

  loadUser() {
    const userRef = this.props.screenProps.fireStoreRefs.user
    userRef.get().then( (doc) => {
          this.setState({
            userData: doc.data()
          })
        }
    )
  }
  loadSeller(ref) {
    ref.get().then( (doc) => {
          this.setState({
            seller: doc,
            sellerData: doc.data()
          })
        }
    )
  }
	purchase() {
    if (this.state.userData.wallet < this.props.navigation.state.params.itemPrice) {
      const backAction = NavigationActions.back({
        key: null
      })
      Alert.alert(null, 'You have insufficient jouls!',
          [
            {text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}
          ])

    } else {
      this.firestore.collection(`market/${this.props.navigation.state.params.itemID}/buyers`).add({
        time: new Date(),
        buyerRef: this.props.screenProps.fireStoreRefs.user,
        buyerUsername: this.state.userData.username
      }).then(
          this.alertAndBack()
      ).catch(function (error) {
        Alert.alert(
            'Error',
            'Please try again later'
        )
        console.error("Error adding document: ", error);
      });
    }
	}
	alertAndBack() {
		const backAction = NavigationActions.back({
			key: null
		})
		Alert.alert(null, 'You have purchased this item!',
			[
				{text: 'OK', onPress: () => this.props.navigation.dispatch(backAction)}
			])
	}

  render() {
    const user = this.props.screenProps.user
    if (user && !this.state.userData) {
      this.loadUser()
    }
    const userData = this.state.userData
    const itemID =  this.props.navigation.state.params.itemID
    const title =  this.props.navigation.state.params.itemTitle
    const price =  this.props.navigation.state.params.itemPrice
    const sellerData = this.state.sellerData
    const description =  this.props.navigation.state.params.itemDescription
    return (
        <View style={styles.container}>
          <View style={styles.topTextBox}>
            <View style={styles.headText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{`${price} jouls`}</Text>
            </View>
            <Text>{sellerData ? `sold by ${sellerData.username}` : null}</Text>
          </View>
          <Text style={styles.descriptionTextBox}>{description}</Text>
          <Text style={styles.emailTextBox}>{sellerData ?
	          `Email ${sellerData.username} at ${sellerData.email} for more information about purchasing this item. When you are ready to exchange for jouls, click "Request to Purchase"`
	          : null}</Text>
	        <TouchableOpacity
		        onPress={() => {this.purchase()} }
		        style={styles.buttonContainer}>
		        <Text style={styles.buttonText}>Request to Purchase</Text>
	        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688'
  },
  topTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  descriptionTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  emailTextBox: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    margin: 10,
    color: 'grey'
  },
  headText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 25,
    fontWeight: '500'
  },
  price: {
    fontSize: 25,
    fontWeight: '500'
  },
  buttonContainer: {
    backgroundColor: '#336E7B',
    padding: 15,
	  margin: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },


});