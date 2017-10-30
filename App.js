import React from 'react';
import { Provider } from 'react-redux';
import Application from './screens/Application';

import store from './redux';


export default class project194 extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    // hihji
    return (
        <Provider store={store}>
          <Application/>
        </Provider>
    );
  }
}

;
