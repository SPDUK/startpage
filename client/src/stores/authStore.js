import { observable, action } from 'mobx';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import _ from 'lodash';

import setAuthToken from '../utils/setAuthToken';

class AuthStore {
  @observable isLoaded = false;
  @observable isAuthenticated = false;
  @observable errors = {};
  @observable
  user = {
    id: '',
    name: ''
  };
  @observable background = 'https://i.imgur.com/FkPvPGH.jpg';

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
        console.log(this.user.name);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        this.user = decoded;
        this.isAuthenticated = true;
        console.log(this.user.name);
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };

  @action
  setUser = decoded => {
    console.log(decoded);
    this.isAuthenticated = !_.isEmpty(decoded);
    console.log(this.user);
    this.user = decoded;
    console.log(this.user);
  };
}

export default new AuthStore();
