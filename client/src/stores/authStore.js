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
  // TODO: set up a toggle on-off somewhere to remove vignette if not needed maybe?
  vignette = true;
  @observable background = 'https://i.imgur.com/FkPvPGH.jpg';

  // currently used to clear errors after posting a new bookmark, if this is not used the
  // form will stay up after submitting a correct form
  clearErrors = () => {
    this.errors = {};
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
    console.log(decoded);
    console.log(this.user);
  };

  @action
  logoutUser = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    this.user = {};
    this.isAuthenticated = false;
  };

  // clock
  @observable
  clock = {
    clocklocation: '',
    format: 'h:mm A',
    dateformat: 'dddd MMMM Do YYYY',
    displayclock: true,
    isLoading: true
  };

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
        console.log(err);
        this.clock.isLoading = true;
        this.errors = err.response.data;
      });
  };

  @action
  toggleClockLoading() {
    this.clock.isLoading = true;
  }

  @action
  fetchClockTime = () => {
    axios
      .get('/api/users/clock/', this.user)
      .then(res => {
        console.log(res);
        if (res.data.displayclock) {
          this.clock.isLoading = false;
          this.clock = res.data;
        }
      })
      .catch(err => {
        // if this fails, redirect them to log back in
        // this should never happen, but the main cause would be is if the JWT is broken somehow
        // so this acts as a kind of "log out" if the user tries to enter an incorrect JWT also
        // when they log back in the JWT will be reset and everything will work again
        console.log(err);
        this.isAuthenticated = false;
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

  // bookmarks
  @observable
  bookmarks = {
    bookmark: '',
    name: '',
    icon: ''
  };

  handleBookmark = bookmark => {
    axios
      .post('api/users/bookmarks', bookmark)
      .then(res => {
        this.bookmarks.push(res.data.bookmark);
        console.log(this.bookmarks);
        this.errors = '';
      })
      .catch(err => {
        console.log(err.response.data);
        this.errors = err.response.data;
      });
  };

  @action
  fetchBookmarks = () => {
    axios
      .get('/api/users/bookmarks/', this.user)
      .then(res => {
        this.bookmarks = res.data;
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };

  deleteBookmark = id => {
    axios
      .delete(`api/users/bookmarks/${id}`)
      .then(res => {
        this.fetchBookmarks();
      })
      .catch(err => {
        this.errors = err.response.data;
      });
  };

  // / TODOS -- TODO: maybe add loading spinner for state in between when a request is sent then turn it off after
  // request is finished?
  @observable
  todos = [
    {
      todo: '',
      completed: true,
      id: ''
    }
  ];

  // TODO: make it so when a todo is completed it shows at the top of the list?
  @observable completedTodos = 0;
  @action
  fetchTodos = () => {
    axios
      .get('/api/users/todos/', this.user)
      .then(res => {
        // console.log(res.data);
        this.todos = res.data;
      })
      .then(() => {
        this.completedTodos = 0;
        for (let i = 0; i < this.todos.length; i += 1) {
          if (this.todos[i].completed === true) {
            this.completedTodos += 1;
          }
        }
      })
      .catch(err => {
        this.errors = err;
      });
  };

  @action
  addTodo = todo => {
    axios
      .post('api/users/todos', todo)
      .then(res => {
        console.log(res.data);
        this.todos.push(res.data.todo);
        // this.todos.push(res.data);
      })
      .catch(err => console.log(err));
  };
  @action
  updateTodo = (id, completed) => {
    // console.log(completed);
    axios.put(`api/users/todos/${id}`, completed).then(() => {
      this.fetchTodos();
    });
  };

  editTodo = todo => {
    console.log(todo.id);
    axios.put(`api/users/todos/${todo.id}`, todo).then(() => {
      this.fetchTodos();
    });
  };
  deleteTodo = id => {
    console.log(id);
    axios.delete(`api/users/todos/${id}`).then(() => {
      this.fetchTodos();
    });
  };
}

export default new AuthStore();
