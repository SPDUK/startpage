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
  // TODO: set up a toggle on-off somewhere to remove vignette if not needed
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
  };

  // CLOCK  TODO: check over this when you are not tired

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
        if (res.data.displayclock) {
          this.clock.isLoading = false;
          this.clock = res.data;
        }
      })
      .catch(err => {
        console.log(err);
        // console.log(err);
        // console.log(res.data);
        // this.errors = err.response.data;
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

  // / TODOS

  @observable
  todos = [
    {
      todo: '',
      completed: true,
      id: ''
    }
  ];

  @observable completedTodos = 0;
  @action
  fetchTodos = () => {
    axios
      .get('/api/users/todos/', this.user)
      .then(res => {
        // console.log(res.data);
        this.todos = res.data;
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
    axios.put(`api/users/todos/${id}`, completed).then(todos => {
      this.fetchTodos();
    });
  };

  editTodo = todo => {
    console.log(todo.id);
    axios.put(`api/users/todos/${todo.id}`, todo).then(todos => {
      this.fetchTodos();
    });
  };
  deleteTodo = id => {
    console.log(id);
    axios.delete(`api/users/todos/${id}`).then(todos => {
      this.fetchTodos();
    });
  };
}

export default new AuthStore();
