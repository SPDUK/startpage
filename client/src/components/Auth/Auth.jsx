import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const styles = {
  auth: {
    zIndex: 500,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '95%',
    maxHeight: '80%',
    height: '80vh',
    width: '95vw',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.8)',
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
    width: 300
  },
  logincontainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  subheading: {
    fontSize: ' 0.8em'
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

@observer
@inject('authStore')
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      signUp: true
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
            <Typography variant="display3">{this.state.signUp ? 'Sign Up' : 'Log in'}</Typography>
            <Typography className={classes.subheading} variant="subheading">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </Typography>
            <Typography className={classes.subheading} variant="subheading">
              Aliquam, mollitia aspernatur temporibus doloremque.
            </Typography>
          </div>
          <div className={classes.logincontainer}>
            <form onSubmit={this.handleSubmit} className={classes.loginform}>
              {this.state.signUp ? (
                <TextField
                  required
                  onChange={this.onChange}
                  name="name"
                  id="username"
                  label="username"
                  value={this.state.name}
                  className={classes.textField}
                  margin="normal"
                />
              ) : null}
              <TextField
                required
                onChange={this.onChange}
                id="email"
                label="email"
                name="email"
                value={this.state.email}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                required
                onChange={this.onChange}
                id="password-input"
                label="password"
                type="password"
                name="password"
                value={this.state.password}
                autoComplete="current-password"
                className={classes.textField}
                margin="normal"
              />
              {this.state.signUp ? (
                <TextField
                  required
                  onChange={this.onChange}
                  id="password-input2"
                  label="confirm password"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  autoComplete="current-password"
                  className={classes.textField}
                  margin="normal"
                />
              ) : null}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input type="submit" style={{ display: 'none' }} />
                <Button
                  onClick={this.toggleForm}
                  style={{ textAlign: 'left' }}
                  className={classes.button}
                >
                  {this.state.signUp ? 'Log In' : 'Sign Up'}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  {this.state.loginForm ? 'Login' : 'Sign Up'}
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
