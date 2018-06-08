import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { inject,  observer} from 'mobx-react';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
}

@inject ('authStore')
@observer class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',

      currentUser: {}
    };
    // this.onSubmit = this.onSubmit.bind(this);
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



  render() {
    const handleSubmit = (e)  => {
      e.preventDefault();
      this.props.authStore.registerUser(e.target);
      console.log(this.props.authStore.errors);
    }
    return (
      <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Enter your password</label>
        <input id="birthdate" name="password" type="text" />
        <button>Send data!</button>
      </form>
      </div>
    );
  }
}

export default App;
