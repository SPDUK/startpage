import { observable, action, computed } from 'mobx';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';
import setAuthToken from '../utils/setAuthToken';

class AuthStore {
  // auth
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

  // clock
  @observable
  clock = {
    clocklocation: 'Europe/London',
    format: 'h:mm A',
    displayclock: true,
    isLoading: true,
    dateformat: 'dddd MMMM Do YYYY'
  };

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
  setClock = () => {
    axios
      .get('/api/users/clock/', this.user)
      .then(res => {
        this.clock = res.data;
      })
      .catch(err => console.log(err));
    this.clock.isLoading = false;
  };

  @computed
  get time() {
    return moment.tz(this.clock.clocklocation).format(`${this.clock.format}`);
  }
  get date() {
    return moment.tz(this.clock.clocklocation).format(this.clock.dateformat);
  }
}

export default new AuthStore();
