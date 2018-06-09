import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  auth: {
    zIndex: 500,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardWrapper: {},
  card: {
    maxWidth: '95%',
    maxHeight: '85%',
    height: '85vh',
    width: '95vw',
    margin: 'auto',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  cardBottom: {
    height: 300
  },
  '@media (min-width: 720px)': {
    card: {
      maxWidth: '90%',
      maxHeight: '75%',
      height: '80vh',
      width: '90vw'
    }
  }
};

@observer
@inject('authStore')
class Auth extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.authStore.loginUser(loginForm);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.auth}>
        <div className={classes.cardWrapper}>
          <Card className={classes.card}>
            <p>hi</p>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Auth);
