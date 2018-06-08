import { observable, action } from 'mobx';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

class AuthStore {
  @observable isLoaded = false;
  @observable isAuthenticated = false;
  @observable errors = {};
  @observable currentUser = {};
  @observable
  user = {
    name: '',
    email: '',
    password: ''
  };

  @action
  registerUser = (userData, history) => {
    axios
      .post('api/users/login', userData)
      .then(userData => console.log(userData))
      .catch(err => (this.errors = err));
  };

  @action
  loginUser = userData => {
    axios.post('api/users/login', userData).then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      const decoded = jwt_decode(token);
      this.currentUser = decoded.catch(err => console.log(err));
    });

  };
}

export default new AuthStore();
