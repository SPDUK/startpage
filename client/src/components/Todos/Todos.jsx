import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Todos.scss';

@inject('authStore')
@observer
class Todos extends Component {
  render() {
    return (
      <div className="todos">
        <Button style={{ color: 'white' }} className="todos-menu" size="large">
          Todos
        </Button>
      </div>
    );
  }
}
export default Todos;
