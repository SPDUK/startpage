import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { inject,  observer} from 'mobx-react';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import DevTools from 'mobx-react-devtools';
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
}

@inject ('authStore')
@observer class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // check to see if user is authenticated

  }
 handleSubmit(e) {
    e.preventDefault();
    const loginForm = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.authStore.loginUser(loginForm);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div className="App">
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange}  name="email" type="email" />
        <input onChange={this.onChange}  name="password" type="text" />
        <button>Send data!</button>
      </form>
      {this.props.authStore.errors.email ? 
      <h1>{this.props.authStore.errors.email}</h1>
        : null}
              {this.props.authStore.errors.password ? 
      <h1>{this.props.authStore.errors.password}</h1>
        : null}
      <DevTools />
      </div>
    );
  }
}

export default App;
