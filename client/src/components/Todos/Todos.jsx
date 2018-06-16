import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import ReactAux from '../../hoc/ReactAux';

import './Todos.scss';

@inject('authStore')
@observer
class Todos extends Component {
  state = {
    gilad: true,
    jason: false,
    antoine: true,
    showTodos: false
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  closeTodos = () => {
    this.setState({
      showTodos: false
    });
  };
  toggleTodos = () => {
    this.setState(prevState => ({
      showTodos: !prevState.showTodos
    }));
  };

  render() {
    return (
      <ReactAux>
        <div
          style={{ outline: 'none', height: '100vh', width: '100vw', hightlight: 'none' }}
          onKeyDown={this.closeTodos}
          tabIndex="-1"
          role="button"
          onClick={this.closeTodos}
        />
        <div className="todos">
          <Grow in={this.state.showTodos}>
            <Card style={{ overflowY: 'auto' }} className="todos-card">
              <FormControl component="fieldset">
                <FormLabel style={{ marginBottom: 10 }} component="legend">
                  Todos: 3 of 12 Completed
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    }
                    label="pick up dog"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    }
                    label="clean my car"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    }
                    label="Gilad Gray"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    }
                    label="Gilad Gray"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.gilad}
                        onChange={this.handleChange('gilad')}
                        value="gilad"
                      />
                    }
                    label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="123456789 12345678456789 1236789 123456784567 123456789 12345678456789"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />{' '}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.jason}
                        onChange={this.handleChange('jason')}
                        value="jason"
                      />
                    }
                    label="Jason Killian"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.antoine}
                        onChange={this.handleChange('antoine')}
                        value="antoine"
                      />
                    }
                    label="Antoine Llorca"
                  />
                </FormGroup>
              </FormControl>
            </Card>
          </Grow>
          <Grow in={this.state.showTodos}>
            <Card style={{ zIndex: 2, marginTop: '-5px' }}>
              <Input
                fullwidth
                style={{ width: '300px' }}
                placeholder="What are your tasks for today?"
                inputProps={{
                  'aria-label': 'Description'
                }}
              />
            </Card>
          </Grow>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={this.toggleTodos}
              style={{ color: 'white', width: '40px', paddingRight: 0 }}
              className="todos-menu"
              size="large"
            >
              Todos
            </Button>
          </div>
        </div>
      </ReactAux>
    );
  }
}
export default Todos;
