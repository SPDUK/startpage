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
    clocklocation: '',
    format: 'h:mm A',
    dateformat: 'dddd MMMM Do YYYY',
    displayclock: true,
    isLoading: true
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

  // CLOCK  TODO: check over this when you are not tired

  //  set up the initial clock
  @action
  setUpClock = format => {
    this.clock.isLoading = true;
    axios
      .post('api/users/clock', format)
      .then(res => {
        this.clock = res.data;
        this.clock.isLoading = false;
      })
      .catch(err => {
        this.clock.isLoading = true;
        this.errors = err.response.data;
      });
  };

  // make an edit clock option, that does not use setupclock as changing isloading etc
  // might cause problems and it will be easier to just avoid them

  // if the user has logged in before -> set the clock to be the response
  // in front-end we show form to setUpClock.
  @action
  fetchClockTime = () => {
    axios
      .get('/api/users/clock/', this.user)
      .then(res => {
        if (res.data.displayclock) {
          this.clock.isLoading = false;
          this.clock = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  @action
  time() {
    return moment.tz(this.clock.clocklocation).format(this.clock.format);
  }
  @computed
  get date() {
    return moment.tz(this.clock.clocklocation).format(this.clock.dateformat);
  }
}

export default new AuthStore();
