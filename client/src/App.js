import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      currentUser: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // check to see if user is authenticated
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.currentUser);
  }
  loginUser(userData) {
    axios.post('/api/users/login', userData).then(res => {
      // save to localStorage
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      // eslint-disable-next-line
      this.setState({ currentUser: decoded})
    });
  }

  render() {
    return (
      <div className="App">
        <p>hi!</p>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.email} onChange={this.onChange} name="email" type="text" />
          <input value={this.state.password} onChange={this.onChange} name="password" type="text" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
