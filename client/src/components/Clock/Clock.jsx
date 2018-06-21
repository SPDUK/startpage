import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import Fade from '@material-ui/core/Fade';
import ReactAux from '../../hoc/ReactAux';

import Bookmarks from './Bookmarks/Bookmarks';
import Searchbar from './Searchbar/Searchbar';
import ClockForm from './ClockForm/ClockForm';
import './Clock.scss';
// send the user with this request
const styles = {
  wrapper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: 500,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-3%'
  },
  clockwrapper: {
    padding: '0 0%'
  },
  clock: {
    fontSize: '5em',
    color: 'rgba(250,250,250, 0.8)',
    fontWeight: 400,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 0,
    fontVariant: 'small-caps',
    height: '98px'
  },
  date: {
    fontSize: '1.05em',
    fontFamily: 'Roboto',
    marginTop: -10,
    fontWeight: 300,
    color: 'rgba(250,250,250, 0.7)',
    textAlign: 'center'
  }
};

@inject('authStore')
@observer
class Clock extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: ''
    };
  }
  componentWillMount() {
    if (this.props.authStore.clock.isLoading) {
      this.props.authStore.fetchClockTime();

      // to hide any incorrect times / when the timer might flash to new timer
      setTimeout(() => {
        this.updatedTime();
      }, 350);

      setInterval(this.updatedTime, 1000);
    }
  }

  updatedTime = () => {
    this.setState({ currentTime: this.props.authStore.time() });
  };

  editClock = () => {
    this.props.authStore.toggleClockLoading();
  };

  render() {
    const { classes, authStore } = this.props;
    return (
      // eslint-disable-next-line
      <div className={classes.wrapper}>
        <div className={classes.clockwrapper}>
          {/* when the fetch request has finished and the user has a location set, show the clock  */}
          {!authStore.clock.isLoading ? (
            <ReactAux>
              <Fade in={!authStore.clock.isLoading} timeout={1000}>
                <h1 id="clock" className={classes.clock}>
                  <span className="clock-time">{this.state.currentTime}</span>
                  <i
                    role="button"
                    onKeyDown={this.editClock}
                    tabIndex="-1"
                    onClick={this.editClock}
                    className="fas fa-pencil-alt clock-edit"
                  />
                </h1>
              </Fade>
              <Fade in={!authStore.clock.isLoading} timeout={1000}>
                <h4 id="date" className={classes.date}>
                  {this.props.authStore.date}
                </h4>
              </Fade>
            </ReactAux>
          ) : (
            <ClockForm />
          )}
        </div>
        <Searchbar />
        <Bookmarks />
      </div>
    );
  }
}

export default withStyles(styles)(Clock);
