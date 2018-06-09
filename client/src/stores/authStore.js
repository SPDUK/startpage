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
    id: '',
    name: ''
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
      setAuthToken(token)
      const decoded = jwt_decode(token);
      this.user = decoded;
      console.log(this.user.id)
      console.log(this.user.name)
    })
    .catch(err => this.errors = err.response.data);
  };
}

export default new AuthStore();
