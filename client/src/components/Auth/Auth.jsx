import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = {
  auth: {
    zIndex: 500,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s ease-in'
  },
  card: {
    maxWidth: '95%',
    maxHeight: '80%',
    height: '80vh',
    width: '95vw',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.9)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  marginLeft: {
    marginLeft: '21px',
    marginBottom: 10
  },
  text: {
    textAlign: 'center'
  },
  loginform: {
    display: 'flex',
    flexDirection: 'column',
    width: 375,
    transition: '0.3s ease'
  },
  logincontainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  subheading: {
    fontSize: ' 0.8em'
  },
  '@media (max-width: 400px)': {
    loginform: {
      width: 280
    },
    card: {
      maxWidth: '95%',
      maxHeight: '90%',
      height: '90vh',
      width: '95vw'
    }
  },
  '@media (min-width: 720px)': {
    card: {
      maxWidth: '90%',
      maxHeight: '80%',
      height: '80vh',
      width: '90vw'
    },
    subheading: {
      fontSize: ' 1em'
    }
  }
};
@inject('authStore')
@observer
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      signUp: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginForm = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    if (this.state.signUp) {
      this.props.authStore.registerUser(loginForm);
    } else {
      this.props.authStore.loginUser(loginForm);
    }
  }

  toggleForm = () => {
    this.setState(prevState => ({
      signUp: !prevState.signUp
    }));
  };

  render() {
    const { classes, authStore } = this.props;
    return (
      <div className={classes.auth}>
        <Card className={classes.card}>
          <h2 className={classes.marginLeft}>AppName.</h2>
          <div className={classes.text}>
            <Collapse in={this.state.signUp} timeout={600}>
              <Typography variant="display3">Sign Up</Typography>
            </Collapse>
            <Collapse in={!this.state.signUp} timeout={650}>
              <Typography variant="display3">Log In</Typography>
            </Collapse>
            <Typography className={classes.subheading} variant="display1">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </Typography>
            <Typography className={classes.subheading} variant="display1">
              Aliquam, mollitia aspernatur temporibus doloremque.
            </Typography>
          </div>
          <div className={classes.logincontainer}>
            <form id="authForm" onSubmit={this.handleSubmit} className={classes.loginform}>
              <Collapse in={this.state.signUp}>
                <FormControl>
                  <TextField
                    onChange={this.onChange}
                    name="name"
                    id="username"
                    label="username *"
                    value={this.state.name}
                    className={classes.textField}
                    margin="dense"
                    style={{ width: 375 }}
                  />
                  <Collapse in={!!authStore.errors.name}>
                    <FormHelperText style={{ color: 'red' }}>
                      {authStore.errors.name}
                    </FormHelperText>
                  </Collapse>
                </FormControl>
              </Collapse>
              <FormControl>
                <TextField
                  onChange={this.onChange}
                  id="email"
                  label="email *"
                  name="email"
                  value={this.state.email}
                  className={classes.textField}
                  margin="dense"
                />
                <Collapse in={!!authStore.errors.email}>
                  <FormHelperText style={{ color: 'red' }}>{authStore.errors.email}</FormHelperText>
                </Collapse>
              </FormControl>
              <FormControl>
                <TextField
                  onChange={this.onChange}
                  id="password-input"
                  label="password *"
                  type="password"
                  name="password"
                  value={this.state.password}
                  autoComplete="current-password"
                  className={classes.textField}
                  margin="dense"
                />
                <Collapse in={!!authStore.errors.password}>
                  <FormHelperText style={{ color: 'red' }}>
                    {authStore.errors.password}
                  </FormHelperText>
                </Collapse>
              </FormControl>
              <Collapse in={this.state.signUp}>
                <FormControl>
                  <TextField
                    onChange={this.onChange}
                    id="password-input2"
                    label="confirm password *"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    autoComplete="current-password"
                    className={classes.textField}
                    margin="dense"
                    style={{ width: 375 }}
                  />
                  <Collapse in={!!authStore.errors.password2}>
                    <FormHelperText style={{ color: 'red' }}>
                      {authStore.errors.password2}
                    </FormHelperText>
                  </Collapse>
                </FormControl>
              </Collapse>
              <div
                id="formBtns"
                style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}
              >
                <input type="submit" style={{ display: 'none' }} />
                <Button
                  onClick={this.toggleForm}
                  style={{ textAlign: 'left' }}
                  className={classes.button}
                  variant="outlined"
                >
                  {this.state.signUp ? 'Log In' : 'Sign Up'}
                </Button>
                <Button type="submit" variant="raised" color="secondary" className={classes.button}>
                  {this.state.signUp ? 'Sign Up' : 'Log In'}
                </Button>
              </div>
            </form>
          </div>
          <Typography className={classes.marginLeft} variant="subheading">
            Privacy Policy
          </Typography>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Auth);
