import { observable, action } from 'mobx';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import _ from 'lodash';

import setAuthToken from '../utils/setAuthToken';

class AuthStore {
  @observable isLoaded = false;
  @observable isAuthenticated = false;
  @observable isSignedIn = false;
  @observable errors = {};
  @observable
  user = {
    id: '',
    name: ''
  };
  @observable background = 'https://i.imgur.com/FkPvPGH.jpg';

  // REGISTER -----
  // registers the user and then when it is finished it will call logInUser with
  // the same form logging them in right away
  @action
  registerUser = userData => {
    axios
      .post('api/users/register', userData)
      .then(res => {
        if (res.data.completed) {
          this.loginUser(userData);
        }
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };

  @action
  loginUser = userData => {
    axios
      .post('api/users/login', userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        this.user = decoded;
        this.isSignedIn = true;
        setTimeout(() => {
          this.isAuthenticated = true;
        }, 600);
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };

  @action
  setUser = decoded => {
    this.isAuthenticated = !_.isEmpty(decoded);
    this.user = decoded;
  };

  // CLOCK  -----
  @action
  setClock() {
    axios
      .get('/api/users/clock/', this.user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

export default new AuthStore();
