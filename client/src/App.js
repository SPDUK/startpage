import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { inject, observer } from 'mobx-react';
import jwtDecode from 'jwt-decode';

import ReactAux from './hoc/ReactAux';
import Clock from './components/Clock/Clock';
import Todos from './components/Todos/Todos';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import setAuthToken from './utils/setAuthToken';
import './App.scss';

import Auth from './components/Auth/Auth';

@inject('authStore')
@observer
class App extends Component {
  componentDidMount() {
    // sets the background image to be the image set in the database
    // currently just sets a pre-selected imgur link for test
    const bg = document.getElementById('bg');
    bg.style.backgroundImage = `url(${this.props.authStore.background}`;
    if (localStorage.jwtToken) {
      // set auth token to the local storage  token if it exists
      setAuthToken(localStorage.jwtToken);
      const decoded = jwtDecode(localStorage.jwtToken);
      this.props.authStore.setUser(decoded);
    }
  }

  render() {
    const { authStore } = this.props;
    return (
      <ReactAux>
        <DevTools />
        <CssBaseline />
        {authStore.isAuthenticated ? (
          <ReactAux>
            <Clock />
            <Todos />
          </ReactAux>
        ) : null}
        {!authStore.isAuthenticated ? <Auth /> : null}
        <div className="app-background">
          <div className="app-background-vignette" />
          <div id="bg" className="app-background-image" />
        </div>
      </ReactAux>
    );
  }
}

export default App;
