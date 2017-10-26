import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content,
  Button, Text, Title,
  Body, Grid, Row, Col } from 'native-base';
import MapView from 'react-native-maps';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	bigText: {
		color: '#000000',
		fontSize: 25
	},
	start: {
	  margin: 'auto',
		backgroundColor: '#009688'
	},
	during: {
		margin: 'auto',
		backgroundColor: '#f44336'
	},
	stop: {
		margin: 'auto',
		backgroundColor: '#3F51B5'
	}
});

const statusConfigs = {
  before: {
    topText: <Text style={styles.bigText}>Press start after entering the bus</Text>,
	  buttonStyle: styles.start,
	  buttonText: <Text>Start Trip</Text>
  },
  during: {
    topText: <Text style={styles.bigText}>Recording Trip...</Text>,
	  buttonStyle: styles.during,
	  buttonText: <Text>End Trip</Text>
  },
  after: {
	  topText: <Text style={styles.bigText}>Submit your trip for verification</Text>,
    buttonStyle: styles.after,
    buttonText: <Text>Submit trip</Text>
  }
}

export default class Actions extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Actions',
  }

  constructor() {
    super()
    // states are before, during, and after
    this.state = {
      status: 'before', // enum to represent the current status of the action screen
	    latitude: null,
	    longitude: null,
	    error: null
    }
  }

  componentWillMount() {
	  this.watchId = navigator.geolocation.watchPosition(
		  (position) => {
			  this.setState({
				  latitude: position.coords.latitude,
				  longitude: position.coords.longitude,
				  error: null,
			  });
		  },
		  (error) => this.setState({ error: error.message }),
		  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
	  );

  }

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	}

  buttonHandler () {
    switch (this.state.status) {
      case 'before':
        this.setState({status: 'during'})
        break
      case 'during':
        this.setState({status: 'after'})
        break
      case 'after':
        this.setState({status: 'before'})
        break
      default:
        this.setState({status: 'before'})
    }
  }
  
  render() {
    const currStatus = this.state.status
    const currProps = statusConfigs[currStatus]
    return (
      <Container>
        <Header>
          <Body>
            <Title>Ride a bus</Title>
          </Body>
        </Header>
        <Content contentContainerStyle = {styles.container}>
          <Grid>
            <Row>
            <Col/>
            <Col>
                <Button onPress={() => this.buttonHandler()}
                        style={currProps.buttonStyle}>
                  {currProps.buttonText}
                </Button>
            </Col>
              <Col/>
            </Row>
	          <Row>
		          {this.state.status === 'during' ?
			          <Text>Latitude: {this.state.latitude}</Text> : null}
		          {this.state.status === 'during' ?
			          <Text>Longitude: {this.state.longitude}</Text> : null}
	          </Row>
          </Grid>
	        <MapView
		        initialRegion={{
			        latitude: 37.78825,
			        longitude: -122.4324,
			        latitudeDelta: 0.0922,
			        longitudeDelta: 0.0421,
		        }}
	        />
        </Content>
      </Container>
    );
  }
}

