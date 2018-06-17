import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
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
        showTodos: false,
        editing: ''
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
    setTimeout(() => {
      document.getElementById(`edit ${id}`).focus();
    }, 150);
  };

  submitEditTodo = e => {
    e.preventDefault();
    const editedTodo = {
      todo: this.state.editingInput,
      id: this.state.editing,
      completed: this.state.editingCompleted
    };

    this.props.authStore.editTodo(editedTodo);
    this.setState({
      editing: ''
    });
  };

  render() {
    const { authStore } = this.props;
    let todos;
    if (authStore.todos[0]) {
      todos = authStore.todos.map(todo => (
        // eslint-disable-next-line -- i don't know why todo._id is not good enough but yeah
        <div key={todo._id || Math.random()} id={todo._id} style={{ width: '270px' }}>
          <Grid id={todo._id} container>
            <Grid item xs={2}>
              <Checkbox
                style={{ paddingBottom: '5px' }}
                onChange={this.toggleTodosDone(todo._id)}
                checked={todo.completed}
              />
            </Grid>
            <Grid className="todos-todo" item xs={8}>
              <Typography
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginTop: '10px',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all'
                }}
                variant="subheading"
              >
                {this.state.editing === todo._id ? (
                  <form onSubmit={this.submitEditTodo}>
                    <Input
                      id={`edit ${todo._id}`}
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
              className="todos-todo-edit"
              onClick={() => this.openEditTodo(todo.todo, todo._id, todo.completed)}
              item
              xs={1}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <i id={todo._id} className="fas fa-pencil-alt todos-action " />
            </Grid>
            <Grid
              className="todos-todo-delete"
              onClick={() => this.props.authStore.deleteTodo(todo._id)}
              item
              xs={1}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
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
                  style={{ marginBottom: 10, paddingLeft: '12px' }}
                  component="legend"
                >
                  {authStore.completedTodos === authStore.todos.length &&
                  authStore.todos.length > 0 ? (
                    <span>Nice job! Everything is completed</span>
                  ) : (
                    <span>
                      {authStore.completedTodos} of {authStore.todos.length} Todos Completed
                    </span>
                  )}
                </FormLabel>
                {todos}
              </FormControl>
            </Card>
          </Grow>
          <Grow in={this.state.showTodos}>
            <Card style={{ zIndex: 2, marginTop: '-5px' }}>
              <form onSubmit={this.addTodo}>
                <Input
                  disabled={!this.state.showTodos}
                  style={{ width: '300px', paddingLeft: '15px' }}
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
