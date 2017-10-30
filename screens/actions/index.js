import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content,
	Text, Title,
  Body, Grid, Row, Col} from 'native-base'
import { Button } from 'react-native-elements'
import MapView from 'react-native-maps'
import locationIcon from './smile.png'


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bigText: {
		color: '#000000',
		fontSize: 25
	},
	start: {
		backgroundColor: '#009688',
		position: 'absolute',
		width: '100%',
		margin: 'auto'
	},
	during: {
		backgroundColor: '#f44336',
		position: 'absolute',
		width: '100%',
		margin: 'auto'
	},
	after: {
		backgroundColor: '#3F51B5',
		position: 'absolute',
		width: '100%',
		margin: 'auto'
	},
	map: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	},
	buttonText: {
		position: 'absolute',
		margin: 'auto'
	}
});


export default class Actions extends React.Component {

  constructor() {
    super()
    // states are before, during, and after
    this.state = {
      status: 'before', // enum to represent the current status of the action screen
	    position: {
		    latitude: 37.78825,
		    longitude: -122.4324
	    },
	    geoLoaded: false,
	    error: null,
    }
    this.recording = false
	  this.geoPath = []
	  this.geoBox = {
    	north: null,
		  south: null,
		  east: null,
		  west: null,
	  }
  }

  componentDidMount() {
	  this.watchId = navigator.geolocation.getCurrentPosition(
		  (position) => {
		  	console.log('position updating...')
			  this.setState({
				  position: {
					  latitude: position.coords.latitude,
					  longitude: position.coords.longitude
				  },
				  geoLoaded: true,
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

  // This should change to watchPosition() if we find that it actually works
  startRecording() {
  	this.recording = true
	  this.recordID = setInterval( () =>
		  navigator.geolocation.getCurrentPosition(
			  (position) => {
				  console.log('position updating...')
				  this.setState({
					  position: {
						  latitude: position.coords.latitude,
						  longitude: position.coords.longitude
					  },
					  geoLoaded: true,
					  error: null,
				  })
				  this.updatePath(position.coords.latitude, position.coords.longitude)
			  },
			  (error) => this.setState({ error: error.message }),
			  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
		  )
	  , 5000);
  }

  // updates the geoPath and the geoBox
  updatePath(latitude, longitude) {
	  this.geoPath.push({
		  time: Date.now(),
		  latitude: latitude,
		  longitude: longitude
	  })
	  // expand the geoBox if needed
	  if (this.geoBox.east === null || longitude < this.geoBox.east ) {
	  	this.geoBox.east = longitude}
	  if (this.geoBox.west === null || longitude > this.geoBox.west ) {
		  this.geoBox.west = longitude}
	  if (this.geoBox.north === null || latitude > this.geoBox.north ) {
		  this.geoBox.north = latitude}
	  if (this.geoBox.south === null || latitude < this.geoBox.south ) {
		  this.geoBox.south = latitude}
  }

  render() {
    const currStatus = this.state.status
    let buttonStyle, buttonText, pathBox

	  // If we're in the 'during' status, we want to start recording the path
	  switch (currStatus) {
		  case 'before':
		  	this.geoPath = []
			  buttonStyle = styles.start
			  buttonText = 'Start Trip'
			  break
		  case 'during':
		  	if (!this.recording) {
				  this.updatePath(this.state.position.latitude, this.state.position.longitude)
				  this.startRecording()
			  }
			  buttonStyle = styles.during
			  buttonText = 'End Trip'
			  break
		  case 'after':
			  clearInterval(this.recordID)
			  this.recording = false
			  buttonStyle = styles.after
			  buttonText = 'Submit Trip'
			  pathBox = {
			  	latitude: (this.geoBox.north + this.geoBox.south) / 2,
				  longitude: (this.geoBox.east + this.geoBox.west) / 2,
				  longitudeDelta: Math.abs(this.geoBox.north - this.geoBox.south) + 0.0008,
				  latitudeDelta: Math.abs(this.geoBox.east - this.geoBox.west) + 0.0008
			  }
	  }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Take Public Transit</Title>
          </Body>
        </Header>
	        <View style ={styles.container}>
		        {this.state.geoLoaded ?
			        <MapView
				        style={styles.map}
				        provider='google'
				        scrollEnabled={false}
				        zoomEnabled={false}
				        pitchEnabled={false}
				        region={currStatus === 'after' ? pathBox : {
					        latitude: this.state.position.latitude,
					        longitude: this.state.position.longitude,
					        latitudeDelta: 0.00922,
					        longitudeDelta: 0.00421,
				        }}
			        >
				        <Button onPress={() => this.buttonHandler()}
				                title={buttonText}
				                buttonStyle={buttonStyle}>
				        </Button>
				        <MapView.Marker
					        coordinate={this.state.position}
				          image={locationIcon}
				        />
				        {this.state.status !== 'before' && this.geoPath.length >= 2 ?
					        // The line of the path the user is taking
				          <MapView.Polyline
					          strokeColor="#009688"
					          strokeWidth={5}
					          coordinates={
				          	this.geoPath.map((point) => {
				          return {
				          	latitude: point.latitude,
					          longitude: point.longitude }}
				          )}/>
					        : null}
			        </MapView>
				        : null }
	        </View>
      </Container>
    );
  }
}

