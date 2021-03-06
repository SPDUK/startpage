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
  @observable
  background =
    'https://res.cloudinary.com/dmjolhdaq/image/upload/v1529553911/startpage/mountains-01.jpg';

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
    this.clock.isLoading = !this.clock.isLoading;
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
        this.errors = '';
      })
      .catch(err => {
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
        this.todos.push(res.data.todo);
        // this.todos.push(res.data);
      })
      .catch(err => console.log(err));
  };
  @action
  updateTodo = (id, completed) => {
    axios.put(`api/users/todos/${id}`, completed).then(() => {
      this.fetchTodos();
    });
  };

  editTodo = todo => {
    axios.put(`api/users/todos/${todo.id}`, todo).then(() => {
      this.fetchTodos();
    });
  };
  deleteTodo = id => {
    axios.delete(`api/users/todos/${id}`).then(() => {
      this.fetchTodos();
    });
  };

  // WEATHER
  key = '9caacdba0323f5bcf30cc1cc2724b63a';
  @observable
  weather = {
    name: '',
    temptype: 'metric',
    displayweather: true
  };

  @observable weatherInfo = {};
  @computed
  get url() {
    return `https://api.openweathermap.org/data/2.5/weather?q=${this.weather.name}&units=${
      this.weather.temptype
    }&appid=${this.key}`;
  }

  @observable weatherLoading = true;
  @action
  fetchWeatherSettings = () => {
    this.weatherLoading = true;
    axios
      .get('/api/users/weather/', this.user)
      .then(res => {
        if (res.data !== null) {
          this.weather = res.data;
        }
      })
      .then(() => {
        if (this.weather !== null) {
          fetch(this.url)
            .then(res => res.json())
            .then(res => {
              this.weatherInfo = res;
            })
            .catch(err => {
              this.errors = err;
            });
        }
      })
      .then((this.weatherLoading = false))
      .catch(err => {
        this.errors = err;
      });
  };

  @observable showWeatherInfo = false;
  @action
  toggleWeatherInfo = () => {
    this.showWeatherInfo = !this.showWeatherInfo;
  };
  @action
  toggleTemptype = () => {
    this.weatherLoading = true;

    if (this.weather.temptype === 'metric') {
      this.weather.temptype = 'imperial';
      axios
        .post('/api/users/weather', this.weather)
        .then(res => {
          this.weather = res.data;
        })
        .then(() => {
          this.fetchWeatherSettings();
        })
        .catch(err => console.log(err));
    } else if (this.weather.temptype === 'imperial') {
      this.weather.temptype = 'metric';
      axios
        .post('/api/users/weather', this.weather)
        .then(res => {
          this.weather = res.data;
        })
        .then(() => {
          this.fetchWeatherSettings();
        })
        .catch(err => console.log(err));
    }
    this.weatherLoading = false;
  };

  @action
  changeWeatherName = name => {
    this.weatherLoading = true;
    this.weather = {
      name: '',
      temptype: 'metric',
      displayweather: true
    };
    this.weather.name = name.name;

    axios
      .post('/api/users/weather', this.weather)
      .then(res => {
        this.weather = res.data;
      })
      .then(() => this.fetchWeatherSettings())
      .then(() => {
        this.weatherLoading = false;
        this.editWeather = false;
      })
      .catch(err => {
        this.errors = err;
        console.log(this.errors);
      });
  };
  @observable editWeather = false;
  @action
  toggleEditWeatherSettings = () => {
    this.editWeather = !this.editWeather;
    this.showWeatherInfo = false;
  };
}

export default new AuthStore();
