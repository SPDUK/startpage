import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

import Grow from '@material-ui/core/Grow';
import ReactAux from '../../../hoc/ReactAux';
import './WeatherForm.scss';

// const styles = {
//   card: {
//     height: 250,
//     padding: '30px 0px'
//   }
// };

@inject('authStore')
@observer
class WeatherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // eslint-disable-next-line
      temptype: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const clockForm = {
      clocklocation: this.findCity(this.state.clocklocation),
      format: this.state.format,
      dateformat: this.state.dateformat,
      displayclock: true
    };
    this.props.authStore.setUpClock(clockForm);
  };

  render() {
    const { authStore } = this.props;
    console.log('rerender');
    return (
      <ReactAux>
        {authStore.showWeatherInfo ? (
          <div
            style={{
              outline: 'none',
              height: '100vh',
              width: '100vw',
              hightlight: 'none',
              zIndex: 500
            }}
            onKeyDown={authStore.toggleWeatherInfo}
            tabIndex="-1"
            role="button"
            onClick={authStore.toggleWeatherInfo}
          />
        ) : (
          <div />
        )}
        {authStore.weatherInfo.name ? (
          <Card className="weatherform">
            <ReactAux>
              <Typography className="weatherform-name" variant="title">
                <form noValidate autoComplete="off">
                  <TextField
                    id="name"
                    fullWidth
                    label={`Current Location: ${authStore.weather.name
                      .charAt(0)
                      .toUpperCase()}${authStore.weather.name.slice(1)}`}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    margin="normal"
                  />
                </form>
              </Typography>
            </ReactAux>
          </Card>
        ) : (
          <div />
        )}
      </ReactAux>
    );
  }
}

export default WeatherForm;
