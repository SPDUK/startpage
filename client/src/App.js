import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DevTools from 'mobx-react-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { inject, observer } from 'mobx-react';

import ReactAux from './hoc/ReactAux';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import setAuthToken from './utils/setAuthToken';
import './App.scss';

import Auth from './components/Auth/Auth';

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
}

@inject('authStore')
@observer
class App extends Component {
  componentDidMount() {
    // sets the background image to be the image set in the database
    // currently just sets a pre-selected imgur link for test
    const bg = document.getElementById('bg');
    bg.style.backgroundImage = `url(${this.props.authStore.background}`;
  }

  render() {
    const { authStore } = this.props;
    return (
      <ReactAux>
        <DevTools />
        <CssBaseline />
        <Auth />
        <div className="app-background">
          <div id="bg" className="app-background-image" />
        </div>
      </ReactAux>
    );
  }
}

export default App;
