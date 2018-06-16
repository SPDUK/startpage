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
    showTodos: false,
    newTodo: ''
  };

  componentDidMount() {
    this.props.authStore.fetchTodos();
  }

  toggleTodosDone = id => event => {
    console.log(id);
    console.log(event.target.checked);
    this.setState({ [id]: event.target.checked });
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeTodos = () => {
    if (this.state.showTodos === true) {
      this.setState({
        showTodos: false
      });
    }
  };
  toggleTodosDoneTodos = () => {
    this.setState(prevState => ({
      showTodos: !prevState.showTodos
    }));
  };

  addTodo = e => {
    e.preventDefault();
    const todo = {
      todo: this.state.newTodo,
      completed: false
    };
    this.props.authStore.addTodo(todo);
  };

  render() {
    const { authStore } = this.props;
    let todos;
    if (authStore.todos[0]) {
      todos = authStore.todos.map(todo => (
        <FormControlLabel
          key={todo._id}
          id={todo._id}
          label={todo.todo}
          value={todo._id}
          control={<Checkbox checked={this.state._id} onChange={this.toggleTodosDone(todo._id)} />}
        />
      ));
    }

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
                {todos}
              </FormControl>
            </Card>
          </Grow>
          <Grow in={this.state.showTodos}>
            <Card style={{ zIndex: 2, marginTop: '-5px' }}>
              <form onSubmit={this.addTodo}>
                <Input
                  fullwidth
                  style={{ width: '300px' }}
                  placeholder="What are your tasks for today?"
                  name="newTodo"
                  value={this.state.newTodo}
                  onChange={this.inputChange}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
              </form>
            </Card>
          </Grow>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={this.toggleTodosDoneTodos}
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
