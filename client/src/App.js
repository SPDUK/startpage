import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DevTools from 'mobx-react-devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { inject, observer } from 'mobx-react';
import setAuthToken from './utils/setAuthToken';
import ReactAux from './hoc/ReactAux';
import './App.scss';

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
}

@inject('authStore')
@observer
class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // sets the background image to be the image set in the database
    // currently just sets a pre-selected imgur link for test
    const bg = document.getElementById('bg');
    console.log(this.props.authStore.background);
    bg.style.backgroundImage = `url(${this.props.authStore.background}`;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginForm = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.authStore.loginUser(loginForm);
  }
  render() {
    const { authStore } = this.props;
    return (
      <ReactAux>
        {/* <DevTools /> */}
        <CssBaseline />
        <div className="app-background">
          <div id="bg" className="app-background-image" />
        </div>
      </ReactAux>
    );
  }
}

export default App;
