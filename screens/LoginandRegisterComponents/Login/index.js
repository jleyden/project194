import React from 'react';
import { StackNavigator } from 'react-navigation'
import Login from './Login'
import Reset from './reset'


const LoginNavigator = StackNavigator({
  Login: { screen: Login },
  Reset:{ screen: Reset},
});


export default class Logins extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
        <LoginNavigator />
    );
  }
}


