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
import Grid from '@material-ui/core/Grid';

import ReactAux from '../../hoc/ReactAux';

import './Todos.scss';

@inject('authStore')
@observer
class Todos extends Component {
  state = {
    showTodos: false,
    newTodo: '',
    editing: '',
    editingInput: ''
  };

  componentDidMount() {
    this.props.authStore.fetchTodos();
  }

  // handling a client side todo
  toggleTodosDone = id => event => {
    this.setState({ [id]: event.target.checked });
    const toggledTodo = {
      completed: event.target.checked
    };

    this.props.authStore.updateTodo(id, toggledTodo);
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // manging the todo menu
  closeTodos = () => {
    if (this.state.showTodos === true) {
      this.setState({
        showTodos: false
      });
    }
  };
  toggleTodoList = () => {
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
    this.setState({
      newTodo: ''
    });
  };

  openEditTodo = (todo, id, completed) => {
    this.setState({
      editing: id,
      editingInput: todo,
      editingCompleted: completed
    });
  };

  submitEditTodo = e => {
    e.preventDefault();
    // const meme = document.getElementById(`${this.state.editing}`);

    const editedTodo = {
      todo: this.state.editingInput,
      id: this.state.editing,
      completed: this.state.editingCompleted
    };

    this.props.authStore.editTodo(editedTodo);
  };
  // updateTodo = e => {
  //   e.preventDefault();
  //   const todo = {
  //     todo: this.state.updateTodo,
  //     completed: e.target.checked
  //   };
  //   this.props.authStore.updateTodo(todo);
  // };

  render() {
    const { authStore } = this.props;
    let todos;
    if (authStore.todos[0]) {
      todos = authStore.todos.map(todo => (
        // eslint-disable-next-line
        <div key={todo.id} id={todo.id} style={{ width: '270px' }} onClick={this.openUpdateTodo} tabIndex="-1" role="button">
          <Grid id={todo._id} container>
            <Grid item xs={2}>
              <Checkbox onChange={this.toggleTodosDone(todo._id)} checked={todo.completed} />
            </Grid>
            <Grid item xs={8}>
              <Typography
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginTop: '10px',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all'
                }}
                variant="body2"
              >
                {this.state.editing === todo._id ? (
                  <form onSubmit={this.submitEditTodo}>
                    <input
                      onChange={this.inputChange}
                      name="editingInput"
                      value={this.state.editingInput}
                    />
                  </form>
                ) : (
                  <span>{todo.todo}</span>
                )}
              </Typography>
            </Grid>
            <Grid
              onClick={() => this.openEditTodo(todo.todo, todo._id, todo.completed)}
              item
              xs={1}
            >
              <i id={todo._id} className="fas fa-pencil-alt todos-action " />
              <i id={todo._id} className="fas fa-pencil-alt todos-action " />
            </Grid>
            <Grid item xs={1}>
              <i className="fas fa-times todos-action" />
            </Grid>
          </Grid>
        </div>
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
                <FormLabel
                  onClick={this.props.authStore.updateTodo}
                  style={{ marginBottom: 10 }}
                  component="legend"
                >
                  X of {authStore.todos.length} Todos Completed
                </FormLabel>
                {todos}
              </FormControl>
            </Card>
          </Grow>
          <Grow in={this.state.showTodos}>
            <Card style={{ zIndex: 2, marginTop: '-5px' }}>
              <form onSubmit={this.addTodo}>
                <Input
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
              onClick={this.toggleTodoList}
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
