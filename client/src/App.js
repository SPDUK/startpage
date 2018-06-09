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

  componentWillReceiveProps(nextProps) {
    // check to see if user is authenticated
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
        <img className="app-background" src={authStore.background} alt="" />
      </ReactAux>
    );
  }
}

export default App;
