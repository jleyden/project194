import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import { Container, Header, Content, Text, Icon,
   Left, Body, Right, Switch, Title,
   Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import firebase from 'firebase'
import 'firebase/firestore';
import { List, ListItem } from 'react-native-elements'

import icon from './profile.png'

class Profile extends React.Component {

	static navigationOptions = {
		tabBarLabel: 'Profile',
		tabBarIcon: ({ tintColor }) => (
			<Image
				source={icon}
			  style={{
			  	tintColor: tintColor,
				  height: 26,
				  width: 26
			  }}
			/>)
	};

	constructor() {
		super()
		this.state = {
			user: null,
			events: null,
			userData: null,
		}
		this.firestore = firebase.firestore()
		this.readingUser = false
		this.readingEvents = false
		this.badgeColors = {
			approved: '#009688',
			pending: '#FFEB3B',
			disapproved: '#FF5722'
		}
	}

	loadUser() {
		const userRef = this.props.screenProps.fireStoreRefs.user
		userRef.onSnapshot( (doc) => {
			this.setState({
				userData: doc.data()
			})
			}
		)
	}

	updateEvents() {
		const eventsRef = this.props.screenProps.fireStoreRefs.events
		eventsRef.orderBy("time", "desc").onSnapshot(
			(querySnapshot) => {
				const eventList = []
				querySnapshot.forEach( (doc) => {
					eventList.push(doc.data())
				})
				this.setState({
					events: eventList
				})
			}
		)
	}

	confirmLogout() {
    Alert.alert(
        'Are you sure you want to logout?','',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Logout', onPress: () => this.logout()},
        ],
        { cancelable: false }
    )
	}

	logout() {
    // firebase.auth().signOut().then(function() {
    //   this.props.onLogout()
    // }).catch(function(error) {
    //   console.log(error)
    //   console.log("wtf")
    // });
  }

  render() {
  	const user = this.props.screenProps.user
	  if (user && !this.readingUser) {
  		this.loadUser()
		  this.readingUser = true
	  }
	  if (user && !this.readingEvents) {
		  this.updateEvents()
		  this.readingEvents = true
	  }
	  const userData = this.state.userData
	  const events = this.state.events
	  let rating
	  let wallet
	  if (userData) {
  		rating = userData.rating.toString()
		  wallet = userData.wallet.toString()
	  }
	  if (events) {
	  }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
						<Text style={styles.money}>{`${wallet} jouls`}</Text>
          </Left>
          <Body>
            <Title style={styles.displayName}>{user ? user.displayName : null}</Title>
          </Body>
          <Right>
						{/*<TouchableOpacity onPress={() => this.confirmLogout()}>*/}
							{/*<Text style={styles.logout}>Logout</Text>*/}
						{/*</TouchableOpacity>*/}
          </Right>
        </Header>
	      <ScrollView>
		      <List containerStyle={styles.list}>
			      { events ?
				      events.map((event, i) => (
					      <ListItem containerStyle={styles.listItem}
					                titleStyle={styles.listTitle}
					                key={i}
					                title={event.type}
					                subtitle={event.time.toDateString()}
					                badge={{
					                	value: event.jouls,
						                textStyle: {
							                color: '#212121',
							                fontWeight: 'bold'
						                },
					                  containerStyle: {
					                		backgroundColor: this.badgeColors[event.validation]
					                  }}}
					      />
				      )) : null
			      }
		      </List>
	      </ScrollView>
      </Container>
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
    onLogout: () => { dispatch(logout()); },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  username: {
    color: '#FAFAFA',
    fontSize: 45
  },
  rating: {
    color: '#03A9F4',
    fontSize: 20
  },
  money: {
    color: '#009688',
    fontSize: 20
  },
  logout: {
    fontSize: 20
  },
  item: {
    color: '#FAFAFA',
    padding: 10,
    fontSize: 18,
  },
	displayName: {
  	fontSize: 20
	},
  list: {
    margin: 20
  }, 
  listItem: {
  	height: 75,
	  borderStyle: 'solid',
	  borderWidth: 5,
	  borderColor: '#242424',
	  padding: 5
  },
	listTitle: {
  	color: '#009688'
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);