import { observable, action } from 'mobx';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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
  registerUser = (userData, history) => {
    axios
      .post('api/users/login', userData)
      .then(res => history.push('/login'))
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
        console.log(this.user.id);
        console.log(this.user.name);
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };
}

export default new AuthStore();
